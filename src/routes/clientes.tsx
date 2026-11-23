import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Upload, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionCard } from "@/components/shared/SectionCard";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { DevBadge } from "@/components/shared/DevBadge";
import { CustomerFormDialog } from "@/components/forms/CustomerFormDialog";
import type { CustomerRow } from "@/lib/domain/types";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("clientes");

export const Route = createFileRoute("/clientes")({
  head: () => pageHead(mod.title, mod.description),
  component: CustomersPage,
});

const columns: Column<CustomerRow>[] = [
  { id: "name", header: "Nome", cell: (r) => r.name, primary: true },
  { id: "phone", header: "Telefone", cell: (r) => r.phone },
  { id: "neighborhood", header: "Bairro", cell: (r) => r.neighborhood },
  { id: "orders", header: "Pedidos", cell: (r) => r.ordersCount, align: "right" },
];

function CustomersPage() {
  const rows: CustomerRow[] = [];
  const newCustomer = (
    <CustomerFormDialog
      trigger={
        <Button className="h-11 md:h-9">
          <UserPlus aria-hidden />
          Cadastrar cliente
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
              <Upload aria-hidden />
              Importar lista
            </PendingButton>
            {newCustomer}
          </>
        }
      />

      <FilterBar searchPlaceholder="Buscar por nome, telefone ou bairro" disabled={rows.length === 0} />

      <DataTable
        caption="Lista de clientes"
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        empty={
          <EmptyState
            icon={Users}
            title="Nenhum cliente cadastrado"
            description="Cadastre clientes com telefone e endereço para agilizar pedidos e entregas."
            action={newCustomer}
          />
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Acesso do cliente"
          description="Como o cliente vai entrar para fazer pedidos pelo site."
          actions={<DevBadge />}
        >
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Smartphone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <p>
              O cliente informa o telefone e recebe um código de confirmação. Sem senha para
              lembrar. Este acesso será implementado em uma etapa futura.
            </p>
          </div>
        </SectionCard>
        <ModulePlan items={mod.planned} />
      </div>
    </PageStack>
  );
}
