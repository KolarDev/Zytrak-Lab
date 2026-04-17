import { StellarBadge } from "@/components/shared/StellarBadge";
import { formatDateTime } from "@/lib/utils";
import type { StellarRecord } from "@/types/stellar.types";

export function StellarProvenanceRow({ record }: { record: StellarRecord }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-brand-navy">{record.eventType.replaceAll("_", " ")}</p>
        <p className="text-xs text-slate-500">{formatDateTime(record.createdAt)}</p>
      </div>
      <StellarBadge href={record.explorerUrl} />
    </div>
  );
}
