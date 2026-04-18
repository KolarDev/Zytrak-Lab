import { ArrowDownToLine, Landmark } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { StellarBadge } from "@/components/shared/StellarBadge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Yellow Card USDC wallet"
        subtitle="Visualize cross-border settlement capacity with a live-looking Stellar-ready finance surface."
      />
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <section className="rounded-[32px] border border-white/70 bg-brand-navy p-6 text-white shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <Badge variant="stellar">USDC / Stellar</Badge>
            <StellarBadge href="https://stellar.expert/explorer/testnet" />
          </div>
          <p className="mt-8 text-sm text-slate-300">Available balance</p>
          <p className="mt-2 text-5xl font-semibold">4,820 USDC</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
            Demo balance used to simulate NGN-to-USDC ramping through Yellow Card before locking
            supplier funds in Stellar escrow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="bg-white text-brand-navy hover:bg-slate-100">
              <Landmark className="h-4 w-4" />
              Top up via bank transfer
            </Button>
            <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/15">
              <ArrowDownToLine className="h-4 w-4" />
              View ramp instructions
            </Button>
          </div>
        </section>
        <section className="rounded-[32px] border border-white/70 bg-white/90 p-6">
          <h2 className="text-xl font-semibold text-brand-navy">Funding path</h2>
          <div className="mt-5 space-y-4">
            {[
              "Bank transfer lands in NGN collection account",
              "Yellow Card converts NGN to USDC",
              "USDC appears in Zytrak wallet for secure settlement",
              "Escrow locks funds until verified delivery"
            ].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="pt-2 text-sm text-slate-600">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
