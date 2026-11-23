import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Carrot, FileSpreadsheet, Truck, Users, Wallet, type LucideIcon } from "lucide-react";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("relatorios");

export const Route = createFileRoute("/relatorios")({
  head: () => pageHead(mod.title, mod.description),
  component: ReportsPage,
});

const REPORTS: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Vendas por ciclo", description: "Pedidos e valores de cada semana de vendas.", icon: BarChart3 },
  { title: "Produtos mais vendidos", description: "Quantidades vendidas por produto e categoria.", icon: Carrot },
  { title: "Clientes", description: "Frequência de compra e clientes sem pedidos recentes.", icon: Users },
  { title: "Entregas", description: "Entregas realizadas, pendentes e não entregues.", icon: Truck },
  { title: "Financeiro", description: "Recebimentos por forma de pagamento.", icon: Wallet },
];

function ReportsPage() {
  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <PendingButton variant="outline" className="h-11 md:h-9">
            <FileSpreadsheet aria-hidden />
            Exportar planilha
          </PendingButton>
        }
      />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => (
          <li key={r.title} className="surface flex flex-col gap-4 p-5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <r.icon className="size-5" aria-hidden />
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="text-base font-semibold text-foreground">{r.title}</h2>
              <p className="text-sm text-muted-foreground">{r.description}</p>
            </div>
            <PendingButton variant="secondary" className="h-11 w-full md:h-9">
              Gerar relatório
            </PendingButton>
          </li>
        ))}
      </ul>

      <ModulePlan items={mod.planned} />
    </PageStack>
  );
}
