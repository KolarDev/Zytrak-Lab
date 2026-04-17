import { TEMP_LABELS } from "@/lib/constants";
import type { TemperatureProfile } from "@/types/mock.types";

export function TemperatureBadge({ profile }: { profile: TemperatureProfile }) {
  const config = TEMP_LABELS[profile];
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${config.classes}`}>
      {config.label} · {config.storage}
    </span>
  );
}
