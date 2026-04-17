import { Badge } from "@/components/ui/Badge";
import type { PaymentRail } from "@/types/mock.types";

export function PaymentRailBadge({ rail }: { rail: PaymentRail }) {
  return <Badge variant={rail === "stellar" ? "stellar" : "info"}>{rail === "stellar" ? "USDC / Stellar" : "NGN / Paystack"}</Badge>;
}
