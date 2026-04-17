import type { OrderStatus, TemperatureProfile } from "@/types/mock.types";

export const PRODUCT_CATEGORIES = [
  { label: "All categories", value: "all" },
  { label: "Reagents & Stains", value: "reagents_stains" },
  { label: "Diagnostic Kits", value: "diagnostic_kits" },
  { label: "Culture Media", value: "culture_media" },
  { label: "Haematology", value: "haematology" },
  { label: "Clinical Chemistry", value: "clinical_chemistry" },
  { label: "Molecular Biology", value: "molecular_biology" }
] as const;

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "pending_payment",
  "paid",
  "confirmed",
  "packed",
  "dispatched",
  "in_transit",
  "delivered",
  "confirmed_good",
  "disputed",
  "cancelled"
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: "Pending payment",
  paid: "Paid",
  confirmed: "Confirmed",
  packed: "Packed",
  dispatched: "Dispatched",
  in_transit: "In transit",
  delivered: "Delivered",
  confirmed_good: "Confirmed good",
  disputed: "Disputed",
  cancelled: "Cancelled"
};

export const TEMP_LABELS: Record<
  TemperatureProfile,
  { label: string; storage: string; classes: string }
> = {
  ambient: {
    label: "Ambient",
    storage: "15-25C",
    classes: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  refrigerated: {
    label: "Refrigerated",
    storage: "2-8C",
    classes: "bg-sky-100 text-sky-800 border-sky-200"
  },
  frozen: {
    label: "Frozen",
    storage: "-20C",
    classes: "bg-blue-100 text-blue-800 border-blue-200"
  },
  ultra_cold: {
    label: "Ultra-cold",
    storage: "-80C",
    classes: "bg-violet-100 text-violet-800 border-violet-200"
  }
};
