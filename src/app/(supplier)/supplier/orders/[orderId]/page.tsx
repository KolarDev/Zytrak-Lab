"use client";

import { notFound } from "next/navigation";
import toast from "react-hot-toast";

import { OrderStatusTimeline } from "@/components/shared/OrderStatusTimeline";
import { PageHeader } from "@/components/shared/PageHeader";
import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { StatusUpdateButtons } from "@/components/supplier/StatusUpdateButtons";
import { useOrderStore } from "@/lib/store";

export default function SupplierOrderDetailPage({ params }: { params: { orderId: string } }) {
  const order = useOrderStore((state) => state.orders.find((entry) => entry.id === params.orderId));
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Supplier order ${order.id}`}
        subtitle={order.labName}
        action={
          <StatusUpdateButtons
            status={order.status}
            onAdvance={(next) => {
              updateOrderStatus(order.id, next);
              toast.success(`Order moved to ${next.replaceAll("_", " ")}`);
            }}
          />
        }
      />
      <div className="rounded-[32px] bg-white/90 p-6">
        <OrderStatusTimeline status={order.status} />
      </div>
      <div className="rounded-[32px] bg-white/90 p-6">
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.productName}
              className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr,auto,auto] md:items-center"
            >
              <p className="font-semibold text-brand-navy">{item.productName}</p>
              <TemperatureBadge profile={item.temperatureProfile} />
              <p className="text-sm text-slate-600">{item.quantity} units</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
