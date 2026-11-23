import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPinned, Navigation, Route as RouteIcon, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { SectionCard } from "@/components/shared/SectionCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DevBadge } from "@/components/shared/DevBadge";
import { DELIVERY_STATUS, PAYMENT_METHODS } from "@/lib/domain/status";
import type { DeliveryRow } from "@/lib/domain/types";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("entregas");

export const Route = createFileRoute("/entregas")({
  head: () => pageHead(mod.title, mod.description),
  component: DeliveriesPage,
});

const columns: Column<DeliveryRow>[] = [
  { id: "seq", header: "Ordem", cell: (r) => `${r.sequence}º` },
  { id: "customer", header: "Cliente", cell: (r) => r.customerName, primary: true },
  { id: "address", header: "Endereço", cell: (r) => r.address },
  { id: "payment", header: "Pagamento", cell: (r) => PAYMENT_METHODS[r.paymentMethod] },
  { id: "status", header: "Status", cell: (r) => <StatusBadge status={DELIVERY_STATUS[r.status]} /> },
];

function DeliveriesPage() {
  const rows: DeliveryRow[] = [];

  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <PendingButton className="h-11 md:h-9">
            <RouteIcon aria-hidden />
            Iniciar rota
          </PendingButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Truck className="size-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">Próxima entrega</h2>
                <Badge variant="neutral">Não configurada</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                As entregas acontecem aos sábados, conforme o ciclo de vendas configurado.
              </p>
            </div>
            <Button asChild variant="outline" className="h-11 md:h-9">
              <Link to="/calendario">
                <CalendarDays aria-hidden />
                Calendário
              </Link>
            </Button>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Navigation className="size-6" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">Localização em campo</h2>
                <DevBadge />
              </div>
              <p className="text-sm text-muted-foreground">
                Uso do GPS do celular durante a rota. Ainda não disponível.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <DataTable
        caption="Roteiro de entregas"
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        empty={
          <EmptyState
            icon={MapPinned}
            title="Nenhuma entrega no roteiro"
            description="Os pedidos separados entram aqui, organizados na ordem de entrega."
          />
        }
      />

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
