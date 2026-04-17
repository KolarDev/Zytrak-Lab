"use client";

import { Button } from "@/components/ui/Button";
import type { OrderStatus } from "@/types/mock.types";

const nextStep: Partial<Record<OrderStatus, OrderStatus>> = {
  paid: "confirmed",
  confirmed: "packed",
  packed: "dispatched",
  dispatched: "in_transit",
  in_transit: "delivered"
};

export function StatusUpdateButtons({
  status,
  onAdvance
}: {
  status: OrderStatus;
  onAdvance: (next: OrderStatus) => void;
}) {
  const next = nextStep[status];

  if (!next) return null;

  return <Button onClick={() => onAdvance(next)}>Mark as {next.replaceAll("_", " ")}</Button>;
}
