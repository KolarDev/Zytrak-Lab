import { PageHeader } from "@/components/shared/PageHeader";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function SupplierDashboardPage() {
  const revenue = MOCK_ORDERS.reduce((sum, order) => sum + order.totalAmountNgn, 0);
  const pending = MOCK_ORDERS.filter((order) => !["confirmed_good", "cancelled"].includes(order.status)).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Supplier operations deck" subtitle="Monitor fulfilment volume, revenue, and dispatch readiness." />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] bg-white/90 p-6">
          <p className="text-sm text-slate-500">Pending orders</p>
          <p className="mt-4 text-4xl font-semibold text-brand-navy">{pending}</p>
        </div>
        <div className="rounded-[28px] bg-white/90 p-6">
          <p className="text-sm text-slate-500">Revenue MTD</p>
          <p className="mt-4 text-4xl font-semibold text-brand-teal">{formatCurrency(revenue)}</p>
        </div>
        <div className="rounded-[28px] bg-white/90 p-6">
          <p className="text-sm text-slate-500">Fill rate</p>
          <p className="mt-4 text-4xl font-semibold text-brand-navy">96%</p>
        </div>
      </div>
    </div>
  );
}
