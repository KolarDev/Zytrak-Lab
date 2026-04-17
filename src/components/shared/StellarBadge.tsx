import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/Badge";

export function StellarBadge({ href }: { href: string }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <Badge variant="stellar" className="gap-2">
        <Sparkles className="h-3.5 w-3.5" />
        Verified on Stellar
      </Badge>
    </Link>
  );
}
