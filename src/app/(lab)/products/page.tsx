"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/lab/ProductCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const products = useMemo(
    () =>
      MOCK_PRODUCTS.filter((product) => {
        const matchesCategory = category === "all" || product.category === category;
        const term = search.toLowerCase();
        const matchesSearch =
          !term ||
          product.name.toLowerCase().includes(term) ||
          product.nafdacNumber.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
      }),
    [search, category]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verified supplier marketplace"
        subtitle="Search by product or NAFDAC number and procure through NGN or Stellar settlement."
      />
      <div className="grid gap-4 rounded-[32px] border border-white/70 bg-white/85 p-5 md:grid-cols-2">
        <Input
          label="Search by product or NAFDAC"
          placeholder="e.g. B3-1892"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Select
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          options={PRODUCT_CATEGORIES.map((item) => ({ label: item.label, value: item.value }))}
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
