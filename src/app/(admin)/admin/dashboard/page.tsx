"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_ORDERS, MOCK_SUPPLIERS } from "@/lib/mock-data";
import { useOrderStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const records = useOrderStore((state) => state.records.length);
  const gmv = MOCK_ORDERS.reduce((sum, order) => sum + order.totalAmountNgn, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Platform telemetry" subtitle="Hackathon demo metrics across procurement and blockchain verification." />
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[28px] bg-white/90 p-5">
          <p className="text-sm text-slate-500">GMV</p>
          <p className="mt-4 text-3xl font-semibold text-brand-teal">{formatCurrency(gmv)}</p>
        </div>
        <div className="rounded-[28px] bg-white/90 p-5">
          <p className="text-sm text-slate-500">Active labs</p>
          <p className="mt-4 text-3xl font-semibold text-brand-navy">24</p>
        </div>
        <div className="rounded-[28px] bg-white/90 p-5">
          <p className="text-sm text-slate-500">Active suppliers</p>
          <p className="mt-4 text-3xl font-semibold text-brand-navy">{MOCK_SUPPLIERS.length}</p>
        </div>
        <div className="rounded-[28px] bg-white/90 p-5">
          <p className="text-sm text-slate-500">Stellar records</p>
          <p className="mt-4 text-3xl font-semibold text-stellar">{records}</p>
        </div>
      </div>
    </div>
  );
}
