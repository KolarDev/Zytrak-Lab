"use client";

import Link from "next/link";
import { useState } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { useOrderStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function SupplierOrdersPage() {
  const [filter, setFilter] = useState("all");
  const orders = useOrderStore((state) => state.orders).filter((order) =>
    filter === "all" ? true : order.status === filter
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Incoming orders" subtitle="Advance one stage at a time to preserve auditability." />
      <div className="flex flex-wrap gap-3">
        {["all", "paid", "confirmed", "packed", "dispatched", "in_transit"].map((status) => (
          <button
            key={status}
            className={`rounded-full px-4 py-2 text-sm ${filter === status ? "bg-brand-navy text-white" : "bg-white text-slate-600"}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/supplier/orders/${order.id}`}
            className="grid gap-4 rounded-[28px] border border-white/70 bg-white/90 p-5 md:grid-cols-[1fr,1fr,0.8fr,auto] md:items-center"
          >
            <div>
              <p className="font-semibold text-brand-navy">{order.labName}</p>
              <p className="text-sm text-slate-500">{order.id}</p>
            </div>
            <p className="text-sm text-slate-600">{formatCurrency(order.totalAmountNgn)}</p>
            <Badge variant="info">{order.status.replaceAll("_", " ")}</Badge>
            <span className="text-sm font-medium text-brand-teal">Manage</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
