import { Badge } from "@/components/ui/Badge";

export function ColdChainBadge({ breached = false }: { breached?: boolean }) {
  return (
    <Badge variant={breached ? "danger" : "success"}>
      {breached ? "Temperature breach" : "Cold chain verified"}
    </Badge>
  );
}
