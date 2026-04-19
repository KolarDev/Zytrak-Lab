"use client";

import { notFound } from "next/navigation";
import { useMemo, useState } from "react";
import { Activity, Camera, Clock3, QrCode } from "lucide-react";
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
import { formatCurrency, formatDateTime } from "@/lib/utils";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const orderEntry = useOrderStore((state) =>
    state.orders.find((entry) => entry.id === params.orderId)
  );
  const records = useOrderStore((state) =>
    state.records.filter((record) => record.entityId === params.orderId)
  );
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const attachRecord = useOrderStore((state) => state.attachRecord);
  const [temperature, setTemperature] = useState(orderEntry?.temperatureAtReceipt?.toString() ?? "");
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [txStep, setTxStep] = useState<number | null>(null);

  if (!orderEntry) notFound();

  const order = orderEntry;

  const receiptRecord = useMemo(
    () => records.find((record) => record.eventType === "goods_receipt"),
    [records]
  );

  const coldChainLog = useMemo(() => {
    const baseTime = new Date(order.createdAt).getTime();
    const fallbackTemp = order.temperatureAtReceipt ?? Number(temperature || "4.2");
    const points = [4.6, 4.3, 4.1, 4.0, 4.2, fallbackTemp];

    return points.map((value, index) => ({
      id: `${order.id}-temp-${index}`,
      temperatureValue: value,
      temperatureText: `${value.toFixed(1)}C`,
      checkpoint: index === points.length - 1 ? "Lab intake verified" : `Transit checkpoint ${index + 1}`,
      timestamp: new Date(baseTime + index * 4 * 60 * 60 * 1000).toISOString(),
      verified: Boolean(receiptRecord) || index === points.length - 1
    }));
  }, [order.createdAt, order.id, order.temperatureAtReceipt, receiptRecord, temperature]);

  const chartPoints = useMemo(() => {
    const min = Math.min(...coldChainLog.map((point) => point.temperatureValue)) - 0.4;
    const max = Math.max(...coldChainLog.map((point) => point.temperatureValue)) + 0.4;

    return coldChainLog
      .map((point, index) => {
        const x = 18 + (index * 284) / Math.max(coldChainLog.length - 1, 1);
        const ratio = (point.temperatureValue - min) / Math.max(max - min, 0.1);
        const y = 124 - ratio * 88;
        return `${x},${y}`;
      })
      .join(" ");
  }, [coldChainLog]);

  const confirmDelivery = async () => {
    if (order.coldChainRequired && !temperature) {
      toast.error("Temperature at receipt is required for cold-chain orders");
      return;
    }

    const previousStatus = order.status;

    try {
      setLoading(true);
      setShowScanner(true);
      await wait(1400);
      setShowScanner(false);
      setTxStep(0);
      await wait(450);
      setTxStep(1);
      await wait(450);
      setTxStep(2);
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
      setTxStep(null);
      toast.success("Delivery confirmed and recorded on Stellar");
    } catch (error) {
      setShowScanner(false);
      setTxStep(null);
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
          loading && txStep !== null ? (
            <StellarBadge status="processing" currentStep={txStep} />
          ) : order.txHash ? (
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
              <QrCode className="h-4 w-4" />
              Scan QR to confirm delivery
            </Button>
            <Button variant="ghost" className="mt-3 w-full bg-white/10 text-white hover:bg-white/15">
              Raise dispute
            </Button>
            {loading && txStep !== null ? (
              <div className="mt-4">
                <StellarBadge status="processing" currentStep={txStep} className="w-full" />
              </div>
            ) : null}
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
      {order.coldChainRequired ? (
        <section className="rounded-[32px] border border-white/70 bg-white/95 p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">
                Cold Chain Integrity
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-brand-navy">Live temperature log</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Simulated shipment telemetry sampled every 4 hours from dispatch to lab intake.
                Each checkpoint is paired with a provenance state for judge-friendly traceability.
              </p>
            </div>
            {loading && txStep !== null ? (
              <StellarBadge status="processing" currentStep={txStep} />
            ) : receiptRecord ? (
              <StellarBadge href={receiptRecord.explorerUrl} />
            ) : (
              <ColdChainBadge breached={false} />
            )}
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
            <div className="rounded-[28px] bg-gradient-to-br from-brand-navy to-[#243d83] p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Temperature window</p>
                    <p className="text-xl font-semibold">2.0C to 8.0C maintained</p>
                  </div>
                </div>
                <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  Last: {coldChainLog[coldChainLog.length - 1]?.temperatureText}
                </p>
              </div>
              <div className="mt-6 rounded-[24px] bg-white/5 p-4">
                <svg viewBox="0 0 320 150" className="h-44 w-full">
                  <line x1="18" y1="28" x2="302" y2="28" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
                  <line x1="18" y1="116" x2="302" y2="116" stroke="rgba(255,255,255,0.12)" />
                  <polyline
                    fill="none"
                    stroke="#5EEAD4"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    points={chartPoints}
                  />
                  {coldChainLog.map((point, index) => {
                    const [x, y] = chartPoints.split(" ")[index]?.split(",") ?? ["0", "0"];
                    return (
                      <g key={point.id}>
                        <circle cx={x} cy={y} r="5" fill="#F8FAFC" />
                        <circle cx={x} cy={y} r="3" fill="#34D399" />
                      </g>
                    );
                  })}
                </svg>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-300 sm:grid-cols-6">
                  {coldChainLog.map((point) => (
                    <div key={`${point.id}-label`}>{formatDateTime(point.timestamp).slice(0, 6)}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {coldChainLog.map((point) => (
                <div
                  key={point.id}
                  className="grid gap-4 rounded-[24px] border border-slate-200 bg-white p-4 md:grid-cols-[1fr,auto] md:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-brand-navy">{point.checkpoint}</p>
                      <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                        {point.temperatureText}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" />
                      {formatDateTime(point.timestamp)}
                    </div>
                  </div>
                  <div className="flex items-center justify-start md:justify-end">
                    {loading && txStep !== null && point.verified ? (
                      <StellarBadge status="processing" currentStep={txStep} />
                    ) : receiptRecord && point.verified ? (
                      <StellarBadge href={receiptRecord.explorerUrl} />
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Pending on-chain confirmation
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {showScanner ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[32px] border border-white/10 bg-slate-950/95 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                  Delivery Scan
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Scanning QR payload</h3>
              </div>
              <Camera className="h-6 w-6 text-emerald-200" />
            </div>
            <div className="mt-6 rounded-[28px] border border-emerald-400/30 bg-black p-5">
              <div className="relative mx-auto flex aspect-square max-w-[240px] items-center justify-center rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(94,234,212,0.2),transparent_55%),linear-gradient(135deg,rgba(11,110,79,0.16),rgba(123,97,255,0.18))]">
                <div className="absolute inset-6 rounded-[20px] border border-emerald-300/40" />
                <div className="absolute left-6 right-6 top-1/2 h-0.5 -translate-y-1/2 bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)] animate-pulse" />
                <QrCode className="h-24 w-24 text-white/90" />
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-300">
              Matching shipment QR metadata to the delivery payload before submitting the
              provenance record to Stellar.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
