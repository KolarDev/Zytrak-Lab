import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNowStrict } from "date-fns";

export function cn(...classes: ClassValue[]) {
  return clsx(classes);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(date: string) {
  return format(new Date(date), "dd MMM yyyy");
}

export function formatDateTime(date: string) {
  return format(new Date(date), "dd MMM yyyy, HH:mm");
}

export function formatDateRelative(date: string) {
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
}

export function getExpiryAlertLevel(date: string) {
  const diffDays = Math.ceil(
    (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 7) return "critical";
  if (diffDays <= 30) return "warning";
  return "safe";
}

export async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
