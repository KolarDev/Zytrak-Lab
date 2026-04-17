import { getExpiryAlertLevel } from "@/lib/utils";
import type { MockInventoryLot } from "@/types/mock.types";

export function LotRow({ lot }: { lot: MockInventoryLot }) {
  const level = getExpiryAlertLevel(lot.expiryDate);
  const tone =
    level === "critical"
      ? "text-rose-600"
      : level === "warning"
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Lot</p>
        <p className="mt-1 font-semibold text-brand-navy">{lot.lotNumber}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Batch</p>
        <p className="mt-1 text-sm text-slate-700">{lot.batchNumber}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Quantity</p>
        <p className="mt-1 text-sm text-slate-700">{lot.quantity}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Expiry</p>
        <p className={`mt-1 text-sm font-semibold ${tone}`}>{lot.expiryDate}</p>
      </div>
    </div>
  );
}
