"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  ShoppingBasket,
  WalletCards,
  Warehouse
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { useAuthStore, useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory", icon: Warehouse },
  { href: "/products", label: "Marketplace", icon: ShoppingBasket },
  { href: "/orders", label: "Orders", icon: ClipboardList }
];

const mobileLinks = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/products", label: "Marketplace", icon: ShoppingBasket },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/finance", label: "Wallet", icon: WalletCards }
];

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const cartCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 md:grid-cols-[280px,1fr] md:px-4">
        <aside className="hidden rounded-[32px] bg-brand-navy p-6 text-white shadow-2xl md:block">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">Zytrak</p>
          <h2 className="mt-4 text-2xl font-semibold">Lab Portal</h2>
          <p className="mt-2 text-sm text-slate-300">{user.facilityName}</p>
          <nav className="mt-8 space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active ? "bg-white text-brand-navy" : "text-slate-300 hover:bg-white/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-[24px] bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Signed in as</p>
            <p className="mt-2 text-lg font-semibold">{user.name}</p>
            <Badge className="mt-3" variant="stellar">
              Stellar-ready facility
            </Badge>
          </div>
        </aside>
        <main className="space-y-6 pb-24 md:pb-0">
          <div className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-sm md:rounded-[32px] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Welcome back</p>
              <h1 className="text-2xl font-semibold text-brand-navy">{user.facilityName}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success">{user.location}</Badge>
              <Link
                href="/cart"
                className="inline-flex min-h-[44px] items-center rounded-2xl bg-brand-teal px-4 text-sm font-semibold text-white"
              >
                Cart ({cartCount})
              </Link>
            </div>
          </div>
          {children}
        </main>
      </div>
      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[28px] border border-white/70 bg-brand-navy/95 p-2 shadow-2xl backdrop-blur md:hidden">
        <div className="grid grid-cols-4 gap-2">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex min-h-[58px] flex-col items-center justify-center rounded-2xl px-2 text-[11px] font-medium transition",
                  active ? "bg-white text-brand-navy" : "text-slate-300"
                )}
              >
                <Icon className="mb-1 h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
