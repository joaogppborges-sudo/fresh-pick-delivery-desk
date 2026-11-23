import { CircleDashed } from "lucide-react";
import { DevBadge } from "@/components/shared/DevBadge";
import { SectionCard } from "@/components/shared/SectionCard";

/** Lista o que o módulo fará quando for implementado. */
export function ModulePlan({ items }: { items: readonly string[] }) {
  return (
    <SectionCard title="Previsto para este módulo" actions={<DevBadge />}>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <CircleDashed className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
