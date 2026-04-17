import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-[28px] border border-white/70 bg-white/90 p-10 text-center shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
          Zytrak
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-brand-navy">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you requested is outside the procurement network.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-brand-teal px-5 text-sm font-medium text-white"
        >
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
