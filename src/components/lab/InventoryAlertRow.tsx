import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MockInventoryItem } from "@/types/mock.types";

export function InventoryAlertRow({ item }: { item: MockInventoryItem }) {
  const variant =
    item.reorderStatus === "zero"
      ? "danger"
      : item.reorderStatus === "critical"
        ? "warning"
        : "info";

  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[2fr,1fr,1fr,auto] md:items-center">
      <div>
        <p className="font-semibold text-brand-navy">{item.productName}</p>
        <p className="mt-1 font-mono text-xs text-slate-500">{item.nafdacNumber}</p>
      </div>
      <Badge variant={variant as "danger" | "warning" | "info"}>{item.currentQuantity} left</Badge>
      <p className="text-sm text-slate-600">Expiry: {item.expiryDate}</p>
      <Link href={item.productId ? `/products/${item.productId}` : "/products"}>
        <Button size="sm">Reorder</Button>
      </Link>
    </div>
  );
}
