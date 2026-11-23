import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, CalendarX2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { WEEKLY_MODEL, WEEKDAY_ROLE_LABEL, type WeekdayRole } from "@/lib/domain/sales-cycle";
import type { StatusTone } from "@/lib/domain/status";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const mod = getModule("calendario");

export const Route = createFileRoute("/calendario")({
  head: () => pageHead(mod.title, mod.description),
  component: CalendarPage,
});

const ROLE_TONE: Record<WeekdayRole, StatusTone> = {
  abertura: "success",
  vendas: "primary",
  encerramento: "warning",
  entrega: "info",
  sem_operacao: "neutral",
};

function CalendarPage() {
  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <PendingButton className="h-11 md:h-9">
            <CalendarPlus aria-hidden />
            Criar ciclo
          </PendingButton>
        }
      />

      <SectionCard
        title="Modelo semanal previsto"
        description="Rotina informada para o negócio. O horário de encerramento na sexta ainda não foi definido."
        actions={<Badge variant="neutral">Horário não configurado</Badge>}
      >
        <ol className="grid gap-2 sm:grid-cols-7">
          {WEEKLY_MODEL.map((d) => (
            <li
              key={d.short}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg border border-border p-3 sm:flex-col sm:items-start",
                d.role === "sem_operacao" && "opacity-60",
              )}
            >
              <span className="font-semibold text-foreground">
                <span className="sm:hidden">{d.day}</span>
                <span className="hidden sm:inline">{d.short}</span>
              </span>
              <Badge variant={ROLE_TONE[d.role]} className="whitespace-normal text-left">
                {WEEKDAY_ROLE_LABEL[d.role]}
              </Badge>
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Ciclos de vendas" description="Semanas com datas de abertura, encerramento e entrega.">
        <EmptyState
          icon={CalendarX2}
          title="Nenhum ciclo configurado"
          description="Sem um ciclo configurado, o painel não exibe datas de vendas nem de entrega."
        />
      </SectionCard>

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
