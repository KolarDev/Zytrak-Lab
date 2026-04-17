"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { useAuthStore, useCartStore, useOrderStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const [address, setAddress] = useState("12 Adeola Odeku Street, Victoria Island, Lagos");
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.unitPriceNgn * item.quantity, 0);

  const onCheckout = async () => {
    if (!address.trim()) {
      toast.error("Delivery address is required");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const firstSupplier = items[0];
    const rail = firstSupplier?.supplierName.includes("International") ? "stellar" : "paystack";
    const orderId = `ord-${Date.now()}`;

    addOrder({
      id: orderId,
      labName: user.facilityName,
      supplierId: firstSupplier?.supplierId ?? "sup-001",
      supplierName: firstSupplier?.supplierName ?? "Mixed suppliers",
      status: "paid",
      paymentRail: rail,
      totalAmountNgn: total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      destination: address,
      coldChainRequired: items.some((item) => item.temperatureProfile !== "ambient"),
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        unitPriceNgn: item.unitPriceNgn,
        temperatureProfile:
          MOCK_PRODUCTS.find((product) => product.id === item.productId)?.temperatureProfile ??
          item.temperatureProfile,
        nafdacNumber: item.nafdacNumber
      }))
    });

    clearCart();
    toast.success("Order marked as paid");
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Checkout" subtitle="Simulated settlement for the sprint demo. Orders transition straight into paid status." />
      <div className="grid gap-6 xl:grid-cols-[1fr,0.8fr]">
        <div className="rounded-[32px] border border-white/70 bg-white/90 p-6">
          <Input
            label="Delivery address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            requiredMark
          />
        </div>
        <div className="rounded-[32px] border border-white/70 bg-brand-navy p-6 text-white">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between gap-4">
                <span>{item.name} × {item.quantity}</span>
                <span>{formatCurrency(item.unitPriceNgn * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-white/20 pt-4">
            <p className="text-sm text-slate-300">Total</p>
            <p className="mt-2 text-3xl font-semibold">{formatCurrency(total)}</p>
          </div>
          <Button className="mt-6 w-full" loading={loading} onClick={onCheckout}>
            Pay and create order
          </Button>
        </div>
      </div>
    </div>
  );
}
