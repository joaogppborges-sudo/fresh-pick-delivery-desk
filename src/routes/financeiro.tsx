import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CircleDollarSign, CreditCard, Lock, QrCode, Receipt, Wallet } from "lucide-react";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { PAYMENT_METHODS } from "@/lib/domain/status";
import type { CashEntryRow } from "@/lib/domain/types";
import { formatCurrency } from "@/lib/format";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("financeiro");

export const Route = createFileRoute("/financeiro")({
  head: () => pageHead(mod.title, mod.description),
  component: FinancePage,
});

const columns: Column<CashEntryRow>[] = [
  { id: "description", header: "Descrição", cell: (r) => r.description, primary: true },
  { id: "method", header: "Forma", cell: (r) => PAYMENT_METHODS[r.method] },
  { id: "amount", header: "Valor", cell: (r) => formatCurrency(r.amount), align: "right" },
];

function FinancePage() {
  const rows: CashEntryRow[] = [];

  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <>
            <PendingButton variant="outline" className="h-11 md:h-9">
              <Lock aria-hidden />
              Fechar caixa
            </PendingButton>
            <PendingButton className="h-11 md:h-9">
              <Wallet aria-hidden />
              Abrir caixa
            </PendingButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Recebido no ciclo" icon={CircleDollarSign} />
        <StatCard label="Pix" icon={QrCode} />
        <StatCard label="Dinheiro" icon={Banknote} />
        <StatCard label="Cartão" icon={CreditCard} />
      </div>

      <section className="space-y-3" aria-labelledby="cash-entries">
        <h2 id="cash-entries" className="text-lg font-semibold text-foreground">
          Movimentações do caixa
        </h2>
        <DataTable
          caption="Movimentações do caixa"
          columns={columns}
          rows={rows}
          getRowId={(r) => r.id}
          empty={
            <EmptyState
              icon={Receipt}
              title="Nenhuma movimentação"
              description="Os recebimentos registrados nas entregas aparecerão aqui."
            />
          }
        />
      </section>

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
