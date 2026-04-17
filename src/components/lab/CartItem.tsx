"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types/store.types";

export function CartItem({
  item,
  onRemove,
  onQty
}: {
  item: CartItemType;
  onRemove: () => void;
  onQty: (quantity: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold text-brand-navy">{item.name}</p>
        <p className="mt-1 text-xs text-slate-500">{item.supplierName}</p>
        <p className="mt-1 font-mono text-xs text-slate-400">{item.nafdacNumber}</p>
        <div className="mt-3">
          <TemperatureBadge profile={item.temperatureProfile} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-full bg-slate-100 p-2" onClick={() => onQty(item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
        <button className="rounded-full bg-slate-100 p-2" onClick={() => onQty(item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold text-brand-teal">
          {formatCurrency(item.unitPriceNgn * item.quantity)}
        </p>
        <Button variant="ghost" onClick={onRemove}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
