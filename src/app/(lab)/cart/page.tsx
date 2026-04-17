"use client";

import Link from "next/link";

import { CartItem } from "@/components/lab/CartItem";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const grouped = Object.values(
    items.reduce<Record<string, typeof items>>((acc, item) => {
      acc[item.supplierId] ||= [];
      acc[item.supplierId].push(item);
      return acc;
    }, {})
  );

  const total = items.reduce((sum, item) => sum + item.unitPriceNgn * item.quantity, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Supplier-grouped cart" subtitle="One checkout, split settlement per supplier." />
      {!items.length ? (
        <EmptyState title="Cart is empty" description="Add marketplace products to build a purchase order." />
      ) : (
        <>
          <div className="space-y-6">
            {grouped.map((group) => (
              <section key={group[0].supplierId} className="rounded-[32px] border border-white/70 bg-white/90 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-brand-navy">{group[0].supplierName}</h2>
                  <p className="text-sm text-slate-500">
                    {formatCurrency(
                      group.reduce((sum, item) => sum + item.unitPriceNgn * item.quantity, 0)
                    )}
                  </p>
                </div>
                <div className="mt-5 space-y-3">
                  {group.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onQty={(quantity) => updateQuantity(item.productId, quantity)}
                      onRemove={() => removeItem(item.productId)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-[28px] bg-brand-navy px-6 py-5 text-white">
            <div>
              <p className="text-sm text-slate-300">Total payable</p>
              <p className="text-3xl font-semibold">{formatCurrency(total)}</p>
            </div>
            <Link href="/checkout">
              <Button>Proceed to checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
