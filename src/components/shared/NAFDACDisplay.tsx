import Link from "next/link";

export function NAFDACDisplay({ value }: { value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">NAFDAC</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <code className="font-mono text-sm font-semibold text-brand-navy">{value}</code>
        <Link
          href="https://nafdac.gov.ng/"
          target="_blank"
          className="text-xs font-semibold text-brand-teal"
        >
          Verify
        </Link>
      </div>
    </div>
  );
}
