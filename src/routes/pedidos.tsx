import { createFileRoute } from "@tanstack/react-router";
import { Download, Plus, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SectionCard } from "@/components/shared/SectionCard";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { OrderFormDialog } from "@/components/forms/OrderFormDialog";
import {
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  statusOptions,
  toOptions,
} from "@/lib/domain/status";
import type { OrderRow } from "@/lib/domain/types";
import { formatCurrency } from "@/lib/format";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("pedidos");

export const Route = createFileRoute("/pedidos")({
  head: () => pageHead(mod.title, mod.description),
  component: OrdersPage,
});

const columns: Column<OrderRow>[] = [
  { id: "code", header: "Pedido", cell: (r) => `#${r.code}` },
  { id: "customer", header: "Cliente", cell: (r) => r.customerName, primary: true },
  { id: "items", header: "Itens", cell: (r) => r.itemsCount },
  { id: "total", header: "Total", cell: (r) => formatCurrency(r.total), align: "right" },
  { id: "method", header: "Pagamento", cell: (r) => PAYMENT_METHODS[r.paymentMethod] },
  { id: "payment", header: "Situação", cell: (r) => <StatusBadge status={PAYMENT_STATUS[r.paymentStatus]} /> },
  { id: "status", header: "Status", cell: (r) => <StatusBadge status={ORDER_STATUS[r.status]} /> },
];

function OrdersPage() {
  const rows: OrderRow[] = [];
  const newOrder = (
    <OrderFormDialog
      trigger={
        <Button className="h-11 md:h-9">
          <Plus aria-hidden />
          Novo pedido
        </Button>
      }
    />
  );

  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <>
            <PendingButton variant="outline" className="h-11 md:h-9">
              <Download aria-hidden />
              Exportar
            </PendingButton>
            {newOrder}
          </>
        }
      />

      <FilterBar
        searchPlaceholder="Buscar por cliente ou número do pedido"
        filters={[
          { id: "status", label: "Status", options: statusOptions(ORDER_STATUS) },
          { id: "payment", label: "Pagamento", options: toOptions(PAYMENT_METHODS) },
        ]}
        disabled={rows.length === 0}
      />

      <DataTable
        caption="Lista de pedidos"
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        empty={
          <EmptyState
            icon={ShoppingBasket}
            title="Nenhum pedido registrado"
            description="Os pedidos feitos pelo site ou registrados pelo painel aparecerão aqui."
            action={newOrder}
          />
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Etapas do pedido"
          description="Cada pedido passa por estas etapas até a entrega."
        >
          <ol className="flex flex-wrap gap-2">
            {Object.values(ORDER_STATUS).map((s) => (
              <li key={s.label}>
                <StatusBadge status={s} />
              </li>
            ))}
          </ol>
        </SectionCard>
        <ModulePlan items={mod.planned} />
      </div>
    </PageStack>
  );
}
