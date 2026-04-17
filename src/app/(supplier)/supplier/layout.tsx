"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/supplier/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/supplier/orders", label: "Orders", icon: ClipboardList }
];

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[260px,1fr]">
      <aside className="rounded-[32px] bg-slate-950 p-6 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Zytrak</p>
        <h2 className="mt-4 text-2xl font-semibold">Supplier Portal</h2>
        <nav className="mt-8 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm",
                  active ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="space-y-6">{children}</main>
    </div>
  );
}
