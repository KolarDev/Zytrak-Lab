import Link from "next/link";
import { AlertTriangle, Clock3, PackageX } from "lucide-react";

import { InventoryAlertRow } from "@/components/lab/InventoryAlertRow";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { MOCK_INVENTORY, MOCK_ORDERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const zero = MOCK_INVENTORY.filter((item) => item.reorderStatus === "zero").length;
const low = MOCK_INVENTORY.filter(
  (item) => item.reorderStatus === "low" || item.reorderStatus === "critical"
).length;
const expiry = MOCK_INVENTORY.filter(
  (item) => new Date(item.expiryDate).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000
).length;

const cards = [
  { label: "Zero stock alerts", value: zero, icon: PackageX, tone: "from-rose-500/15 to-rose-100" },
  { label: "Low stock alerts", value: low, icon: AlertTriangle, tone: "from-amber-500/15 to-amber-100" },
  { label: "Near expiry items", value: expiry, icon: Clock3, tone: "from-sky-500/15 to-sky-100" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Morning command center"
        subtitle="Inventory risk, active procurement, and delivery progress in one view."
        action={
          <Link href="/products">
            <Button>Source urgent stock</Button>
          </Link>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`rounded-[28px] border border-white/60 bg-gradient-to-br ${card.tone} p-6`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">{card.label}</p>
                <Icon className="h-5 w-5 text-brand-navy" />
              </div>
              <p className="mt-6 text-4xl font-semibold text-brand-navy">{card.value}</p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-brand-navy">Critical inventory alerts</h2>
          <div className="mt-5 space-y-3">
            {MOCK_INVENTORY.filter((item) => item.reorderStatus !== "ok").slice(0, 5).map((item) => (
              <InventoryAlertRow key={item.id} item={item} />
            ))}
          </div>
        </section>
        <section className="rounded-[32px] border border-white/70 bg-brand-navy p-6 text-white shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Procurement pulse</p>
          <h2 className="mt-4 text-2xl font-semibold">Orders moving this week</h2>
          <div className="mt-6 space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="rounded-2xl bg-white/10 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-slate-300">{order.supplierName}</p>
                  </div>
                  <p className="text-lg font-semibold text-emerald-200">
                    {formatCurrency(order.totalAmountNgn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
