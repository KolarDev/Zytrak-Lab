"use client";

import Link from "next/link";
import { useState } from "react";

import { PageHeader } from "@/components/shared/PageHeader";
import { PaymentRailBadge } from "@/components/shared/PaymentRailBadge";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import { useOrderStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.max(1, Math.ceil(orders.length / perPage));
  const slice = orders.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <PageHeader title="Order history" subtitle="Every procurement record, payment rail, and delivery state across the facility." />
      <div className="rounded-[32px] border border-white/70 bg-white/90 p-4">
        <div className="grid gap-4">
          {slice.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="grid gap-4 rounded-[24px] border border-slate-200 p-4 md:grid-cols-[1fr,1fr,0.8fr,0.8fr,auto] md:items-center"
            >
              <div>
                <p className="font-semibold text-brand-navy">{order.id}</p>
                <p className="text-sm text-slate-500">{formatDate(order.createdAt)}</p>
              </div>
              <p className="text-sm text-slate-700">{order.supplierName}</p>
              <PaymentRailBadge rail={order.paymentRail} />
              <Badge variant={order.status === "confirmed_good" ? "success" : "info"}>
                {ORDER_STATUS_LABELS[order.status]}
              </Badge>
              <p className="text-right font-semibold text-brand-teal">{formatCurrency(order.totalAmountNgn)}</p>
            </Link>
          ))}
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
