"use client";

import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { ColdChainBadge } from "@/components/shared/ColdChainBadge";
import { OrderStatusTimeline } from "@/components/shared/OrderStatusTimeline";
import { PageHeader } from "@/components/shared/PageHeader";
import { PaymentRailBadge } from "@/components/shared/PaymentRailBadge";
import { StellarBadge } from "@/components/shared/StellarBadge";
import { StellarProvenanceRow } from "@/components/shared/StellarProvenanceRow";
import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { useOrderStore } from "@/lib/store";
import { writeProvenanceRecord } from "@/lib/stellar";
import { formatCurrency } from "@/lib/utils";

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const order = useOrderStore((state) => state.orders.find((entry) => entry.id === params.orderId));
  const records = useOrderStore((state) =>
    state.records.filter((record) => record.entityId === params.orderId)
  );
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const attachRecord = useOrderStore((state) => state.attachRecord);
  const [temperature, setTemperature] = useState(order?.temperatureAtReceipt?.toString() ?? "");
  const [loading, setLoading] = useState(false);

  const receiptRecord = useMemo(
    () => records.find((record) => record.eventType === "goods_receipt"),
    [records]
  );

  if (!order) notFound();

  const confirmDelivery = async () => {
    if (order.coldChainRequired && !temperature) {
      toast.error("Temperature at receipt is required for cold-chain orders");
      return;
    }

    const previousStatus = order.status;

    try {
      setLoading(true);
      updateOrderStatus(order.id, "confirmed_good");
      const record = await writeProvenanceRecord("goods_receipt", order.id, {
        temperature_at_receipt: temperature ? Number(temperature) : null,
        confirmed_by: "Dr. Adeyemi",
        items: order.items
      });
      attachRecord(order.id, record, {
        status: "confirmed_good",
        temperatureAtReceipt: temperature ? Number(temperature) : undefined
      });
      toast.success("Delivery confirmed and recorded on Stellar");
    } catch (error) {
      updateOrderStatus(order.id, previousStatus);
      toast.error(error instanceof Error ? error.message : "Stellar write failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Order ${order.id}`}
        subtitle={`${order.supplierName} · ${ORDER_STATUS_LABELS[order.status]}`}
        action={
          order.txHash ? (
            <StellarBadge href={`https://stellar.expert/explorer/testnet/tx/${order.txHash}`} />
          ) : null
        }
      />
      <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
        <OrderStatusTimeline status={order.status} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <section className="rounded-[32px] border border-white/70 bg-white/90 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <PaymentRailBadge rail={order.paymentRail} />
            {order.coldChainRequired ? <ColdChainBadge breached={false} /> : null}
          </div>
          <div className="mt-6 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.productName}
                className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.4fr,1fr,auto] md:items-center"
              >
                <div>
                  <p className="font-semibold text-brand-navy">{item.productName}</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">{item.nafdacNumber}</p>
                </div>
                <TemperatureBadge profile={item.temperatureProfile} />
                <p className="font-semibold text-brand-teal">
                  {formatCurrency(item.quantity * item.unitPriceNgn)}
                </p>
              </div>
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-[32px] border border-white/70 bg-brand-navy p-6 text-white">
            <p className="text-sm text-slate-300">Order total</p>
            <p className="mt-2 text-3xl font-semibold">{formatCurrency(order.totalAmountNgn)}</p>
            {order.coldChainRequired ? (
              <div className="mt-6">
                <Input
                  label="Temperature at receipt (C)"
                  value={temperature}
                  onChange={(event) => setTemperature(event.target.value)}
                  className="text-slate-900"
                />
              </div>
            ) : null}
            <Button
              className="mt-4 w-full"
              onClick={confirmDelivery}
              loading={loading}
              disabled={!["dispatched", "in_transit", "delivered"].includes(order.status)}
            >
              Confirm delivery
            </Button>
            <Button variant="ghost" className="mt-3 w-full bg-white/10 text-white hover:bg-white/15">
              Raise dispute
            </Button>
          </div>
          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
            <h2 className="text-xl font-semibold text-brand-navy">Stellar provenance</h2>
            <p className="mt-2 text-sm text-slate-500">
              Verified records appear here after a successful blockchain write.
            </p>
            <div className="mt-5 space-y-3">
              {records.length ? (
                records.map((record) => <StellarProvenanceRow key={record.id} record={record} />)
              ) : (
                <p className="text-sm text-slate-500">No blockchain records attached yet.</p>
              )}
            </div>
            {receiptRecord ? (
              <p className="mt-4 font-mono text-xs text-slate-500">{receiptRecord.txHash}</p>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
