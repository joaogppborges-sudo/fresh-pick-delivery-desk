import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, PackageCheck, Printer } from "lucide-react";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ORDER_STATUS } from "@/lib/domain/status";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("separacao");

export const Route = createFileRoute("/separacao")({
  head: () => pageHead(mod.title, mod.description),
  component: PickingPage,
});

const lanes = [ORDER_STATUS.confirmado, ORDER_STATUS.em_separacao, ORDER_STATUS.separado];

function PickingPage() {
  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <PendingButton variant="outline" className="h-11 md:h-9">
            <Printer aria-hidden />
            Imprimir lista
          </PendingButton>
        }
      />

      <SectionCard
        title="Lista consolidada"
        description="Total de cada produto a separar para a entrega."
      >
        <EmptyState
          icon={ClipboardList}
          title="Nada para separar"
          description="Quando as vendas do ciclo forem encerradas, os produtos dos pedidos aparecerão somados aqui."
        />
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-3">
        {lanes.map((lane) => (
          <SectionCard key={lane.label} className="flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <StatusBadge status={lane} />
              <span className="text-xs text-muted-foreground">0 pedidos</span>
            </div>
            <EmptyState compact icon={PackageCheck} title="Nenhum pedido" />
          </SectionCard>
        ))}
      </div>

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
