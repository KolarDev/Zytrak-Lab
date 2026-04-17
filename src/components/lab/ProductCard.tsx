"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import type { MockProduct } from "@/types/mock.types";

export function ProductCard({ product }: { product: MockProduct }) {
  const addItem = useCartStore((state) => state.addItem);

  const onAdd = () => {
    addItem({
      productId: product.id,
      supplierId: product.supplierId,
      supplierName: product.supplierName,
      name: product.name,
      nafdacNumber: product.nafdacNumber,
      temperatureProfile: product.temperatureProfile,
      unitPriceNgn: product.unitPriceNgn,
      quantity: 1
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/95 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <TemperatureBadge profile={product.temperatureProfile} />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {product.category.replaceAll("_", " ")}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-brand-navy">{product.name}</h3>
      <p className="mt-2 font-mono text-xs text-slate-500">{product.nafdacNumber}</p>
      <p className="mt-3 text-sm text-slate-600">{product.supplierName}</p>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Unit price</p>
          <p className="mt-1 text-lg font-semibold text-brand-teal">{formatCurrency(product.unitPriceNgn)}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex min-h-[44px] items-center rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-700"
          >
            View
          </Link>
          <Button onClick={onAdd} disabled={product.stockQuantity === 0}>
            {product.stockQuantity === 0 ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
