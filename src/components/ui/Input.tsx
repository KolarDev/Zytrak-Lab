import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
  requiredMark?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, helperText, requiredMark, className, ...props },
  ref
) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {requiredMark ? <span className="ml-1 text-rose-600">*</span> : null}
      </span>
      <input
        ref={ref}
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20",
          error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100" : "",
          className
        )}
        {...props}
      />
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
      {!error && helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
    </label>
  );
});
