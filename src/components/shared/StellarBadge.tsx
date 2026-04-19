"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const STEPS = ["Hashing", "Signing", "Ledger Entry"] as const;

type StellarBadgeProps = {
  href?: string;
  status?: "processing" | "complete";
  currentStep?: number;
  className?: string;
};

export function StellarBadge({
  href,
  status = "complete",
  currentStep = 0,
  className
}: StellarBadgeProps) {
  const processing = status === "processing";

  const content = (
    <span className="inline-flex items-center gap-2">
      {processing ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      )}
      {processing ? "Submitting to Stellar" : "Verified on Stellar"}
    </span>
  );

  const badge = (
    <div
      className={cn(
        "inline-flex flex-col gap-2 rounded-2xl border border-stellar/20 bg-stellar-light/90 px-3 py-2 shadow-sm transition",
        processing ? "animate-pulse" : "animate-[badgePop_320ms_ease-out]",
        className
      )}
    >
      <Badge variant="stellar" className="gap-2 self-start">
        {processing ? <Sparkles className="h-3.5 w-3.5" /> : content.props.children[0]}
        {processing ? "Submitting to Stellar" : "Verified on Stellar"}
      </Badge>
      <div className="flex flex-wrap items-center gap-2">
        {STEPS.map((step, index) => {
          const active = index === currentStep;
          const done = !processing || index < currentStep;
          return (
            <span
              key={step}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                done
                  ? "bg-emerald-100 text-emerald-700"
                  : active
                    ? "bg-stellar text-white"
                    : "bg-slate-100 text-slate-500"
              )}
            >
              {step}
            </span>
          );
        })}
      </div>
    </div>
  );

  if (processing || !href) {
    return badge;
  }

  return (
    <Link href={href} target="_blank" rel="noreferrer" className="inline-flex">
      {badge}
    </Link>
  );
}
