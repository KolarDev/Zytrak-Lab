import Link from "next/link";
import { notFound } from "next/navigation";

import { LotRow } from "@/components/lab/LotRow";
import { PageHeader } from "@/components/shared/PageHeader";
import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { Button } from "@/components/ui/Button";
import { MOCK_INVENTORY } from "@/lib/mock-data";

export default function InventoryDetailPage({ params }: { params: { itemId: string } }) {
  const item = MOCK_INVENTORY.find((entry) => entry.id === params.itemId);

  if (!item) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={item.productName}
        subtitle={`${item.location} · ${item.currentQuantity} ${item.unit} available`}
        action={
          <Link href={item.productId ? `/products/${item.productId}` : "/products"}>
            <Button>Reorder product</Button>
          </Link>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
        <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
          <TemperatureBadge profile={item.temperatureProfile} />
          <p className="mt-4 font-mono text-sm text-slate-500">{item.nafdacNumber}</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-slate-400">Reorder point</dt>
              <dd className="font-semibold text-brand-navy">{item.reorderPoint}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Location</dt>
              <dd className="font-semibold text-brand-navy">{item.location}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Nearest expiry</dt>
              <dd className="font-semibold text-brand-navy">{item.expiryDate}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
          <h2 className="text-xl font-semibold text-brand-navy">Tracked lots</h2>
          <div className="mt-5 space-y-3">
            {item.lots.length ? (
              item.lots.map((lot) => <LotRow key={lot.id} lot={lot} />)
            ) : (
              <p className="text-sm text-slate-500">No detailed lot history available in the sprint dataset.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
