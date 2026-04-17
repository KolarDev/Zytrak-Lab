"use client";

import Link from "next/link";
import { useState } from "react";

import { TemperatureBadge } from "@/components/shared/TemperatureBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_INVENTORY } from "@/lib/mock-data";

const tabs = ["all", "zero", "low", "near-expiry"] as const;

export default function InventoryPage() {
  const [filter, setFilter] = useState<(typeof tabs)[number]>("all");

  const items = MOCK_INVENTORY.filter((item) => {
    if (filter === "zero") return item.reorderStatus === "zero";
    if (filter === "low") return item.reorderStatus === "low" || item.reorderStatus === "critical";
    if (filter === "near-expiry") return new Date(item.expiryDate).getTime() - Date.now() < 45 * 24 * 60 * 60 * 1000;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory command log" subtitle="Track stock health, expiry risk, and cold-chain readiness across the facility." />
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === filter ? "bg-brand-navy text-white" : "bg-white text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="rounded-[32px] border border-white/70 bg-white/90 p-4 shadow-sm">
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-[24px] border border-slate-200 p-4 md:grid-cols-[1.6fr,1fr,1fr,auto] md:items-center"
            >
              <div>
                <p className="text-lg font-semibold text-brand-navy">{item.productName}</p>
                <p className="mt-1 font-mono text-xs text-slate-500">{item.nafdacNumber}</p>
              </div>
              <div className="space-y-2">
                <TemperatureBadge profile={item.temperatureProfile} />
                <Badge
                  variant={
                    item.reorderStatus === "zero"
                      ? "danger"
                      : item.reorderStatus === "critical"
                        ? "warning"
                        : item.reorderStatus === "low"
                          ? "info"
                          : "success"
                  }
                >
                  {item.currentQuantity} {item.unit}
                </Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>{item.location}</p>
                <p className="mt-1">Expiry {item.expiryDate}</p>
              </div>
              <Link href={`/inventory/${item.id}`}>
                <Button variant="secondary">Details</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
