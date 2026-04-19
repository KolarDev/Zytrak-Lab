"use client";

import { useMemo, useState } from "react";
import { ArrowDownToLine, Landmark, Loader2 } from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { StellarBadge } from "@/components/shared/StellarBadge";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export default function FinancePage() {
  const [balance, setBalance] = useState(4820);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("1250");
  const [step, setStep] = useState<"idle" | "bank" | "converting" | "settled">("idle");

  const ngnValue = useMemo(() => Number(amount || "0"), [amount]);

  const simulateTopUp = async () => {
    if (!ngnValue || ngnValue <= 0) return;

    setStep("bank");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStep("converting");
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setStep("settled");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setBalance((prev) => prev + ngnValue);
    setOpen(false);
    setStep("idle");
    setAmount("1250");
  };

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
          <p className="mt-2 text-5xl font-semibold">{balance.toLocaleString()} USDC</p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
            Demo balance used to simulate NGN-to-USDC ramping through Yellow Card before locking
            supplier funds in Stellar escrow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="bg-white text-brand-navy hover:bg-slate-100" onClick={() => setOpen(true)}>
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
      <Modal open={open} onClose={() => (step === "idle" ? setOpen(false) : undefined)} title="Simulate bank-to-USDC top-up">
        <div className="space-y-5">
          <Input
            label="USDC amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
            helperText="For demo purposes, 1 bank transfer unit settles as 1 USDC."
          />
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium text-brand-navy">Transfer route</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p className={step === "bank" ? "font-semibold text-brand-teal" : ""}>1. Bank transfer detected</p>
              <p className={step === "converting" ? "font-semibold text-brand-teal" : ""}>2. Yellow Card converts NGN to USDC</p>
              <p className={step === "settled" ? "font-semibold text-brand-teal" : ""}>3. Wallet balance settles on Zytrak</p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={step !== "idle"}>
              Cancel
            </Button>
            <Button onClick={simulateTopUp} disabled={step !== "idle" || ngnValue <= 0}>
              {step === "idle" ? (
                <>
                  <Landmark className="h-4 w-4" />
                  Confirm top-up
                </>
              ) : (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing transfer
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
