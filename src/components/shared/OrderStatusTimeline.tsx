import { Check } from "lucide-react";

import { ORDER_STATUS_LABELS, ORDER_STATUS_STEPS } from "@/lib/constants";
import type { OrderStatus } from "@/types/mock.types";

export function OrderStatusTimeline({ status }: { status: OrderStatus }) {
  const activeIndex = ORDER_STATUS_STEPS.indexOf(status);

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[960px] grid-cols-10 gap-3">
        {ORDER_STATUS_STEPS.map((step, index) => {
          const completed = index < activeIndex;
          const active = index === activeIndex;

          return (
            <div key={step} className="flex flex-col items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold ${
                  completed
                    ? "border-brand-teal bg-brand-teal text-white"
                    : active
                      ? "border-brand-navy bg-white text-brand-navy ring-4 ring-brand-navy/10"
                      : "border-slate-200 bg-slate-100 text-slate-400"
                }`}
              >
                {completed ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <p className="text-center text-xs font-medium text-slate-600">{ORDER_STATUS_LABELS[step]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
