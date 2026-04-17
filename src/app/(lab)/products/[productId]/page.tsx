"use client";

import { NAFDACDisplay } from "@/components/shared/NAFDACDisplay";
import { PageHeader } from "@/components/shared/PageHeader";
import { PaymentRailBadge } from "@/components/shared/PaymentRailBadge";
import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { Button } from "@/components/ui/Button";
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from "@/lib/mock-data";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

function AddToCartButton({ productId }: { productId: string }) {
  "use client";

  const product = MOCK_PRODUCTS.find((entry) => entry.id === productId)!;
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button
      onClick={() =>
        addItem({
          productId: product.id,
          supplierId: product.supplierId,
          supplierName: product.supplierName,
          name: product.name,
          nafdacNumber: product.nafdacNumber,
          temperatureProfile: product.temperatureProfile,
          unitPriceNgn: product.unitPriceNgn,
          quantity: 1
        })
      }
      disabled={product.stockQuantity === 0}
    >
      {product.stockQuantity === 0 ? "Out of stock" : "Add to cart"}
    </Button>
  );
}

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = MOCK_PRODUCTS.find((entry) => entry.id === params.productId);
  if (!product) {
    return (
      <div className="rounded-[32px] border border-white/70 bg-white/90 p-8 text-sm text-slate-600">
        Product not found.
      </div>
    );
  }

  const supplier = MOCK_SUPPLIERS.find((entry) => entry.id === product.supplierId);

  return (
    <div className="space-y-6">
      <PageHeader title={product.name} subtitle={product.description} action={<AddToCartButton productId={product.id} />} />
      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
          <div className="flex flex-wrap gap-3">
            <TemperatureBadge profile={product.temperatureProfile} />
            <PaymentRailBadge rail={supplier?.type === "international" ? "stellar" : "paystack"} />
          </div>
          <p className="mt-6 text-4xl font-semibold text-brand-teal">{formatCurrency(product.unitPriceNgn)}</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">{product.storageInstructions}</p>
        </div>
        <div className="space-y-6">
          <NAFDACDisplay value={product.nafdacNumber} />
          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
            <h2 className="text-xl font-semibold text-brand-navy">Supplier</h2>
            <p className="mt-3 text-lg font-medium text-slate-800">{supplier?.name}</p>
            <p className="mt-1 text-sm text-slate-500">{supplier?.state}</p>
            <p className="mt-4 text-sm text-slate-600">
              Performance score: <span className="font-semibold text-brand-navy">{supplier?.performanceScore}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
