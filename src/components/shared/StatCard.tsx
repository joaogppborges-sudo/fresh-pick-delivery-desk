import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  icon: LucideIcon;
  /** Valor real; quando ausente, o card mostra o estado "sem dados conectados". */
  value?: string | undefined;
  hint?: string | undefined;
};

export function StatCard({ label, icon: Icon, value, hint }: StatCardProps) {
  const hasValue = value !== undefined;
  return (
    <div className="surface flex flex-col gap-3 p-4 md:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
          <Icon className="size-4" aria-hidden />
        </div>
      </div>
      <p
        className="font-display text-2xl font-semibold text-foreground md:text-3xl"
        aria-label={hasValue ? undefined : `${label}: sem dados`}
      >
        {hasValue ? value : "—"}
      </p>
      <p className="text-xs text-muted-foreground">{hint ?? (hasValue ? "" : "Sem dados conectados")}</p>
    </div>
  );
}
