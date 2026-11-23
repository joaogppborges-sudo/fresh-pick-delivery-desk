import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarClock,
  CalendarDays,
  Carrot,
  PackageCheck,
  ShoppingBasket,
  Truck,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { SectionCard } from "@/components/shared/SectionCard";
import { Badge } from "@/components/ui/badge";
import { OrderFormDialog } from "@/components/forms/OrderFormDialog";
import { CustomerFormDialog } from "@/components/forms/CustomerFormDialog";
import { ProductFormDialog } from "@/components/forms/ProductFormDialog";
import { getModule, MODULES } from "@/lib/modules";
import { formatDate } from "@/lib/format";
import { pageHead } from "@/lib/seo";

const mod = getModule("dashboard");

export const Route = createFileRoute("/")({
  head: () => pageHead(mod.title, mod.description),
  component: Dashboard,
});

function useTodayLabel() {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    setLabel(formatDate(new Date(), { weekday: "long", day: "numeric", month: "long" }));
  }, []);
  return label;
}

function QuickAction({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <span className="flex w-full items-center gap-3 text-left">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="block truncate text-xs font-normal text-muted-foreground">
          {description}
        </span>
      </span>
      <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
    </span>
  );
}

const quickActionClass =
  "group surface h-auto w-full justify-start p-4 hover:border-primary/40 hover:bg-card hover:shadow-raised";

function Dashboard() {
  const today = useTodayLabel();

  return (
    <PageStack>
      <PageHeader
        title="Bom trabalho na horta"
        description={
          today
            ? `Hoje é ${today}. Os indicadores aparecerão aqui quando os dados forem conectados.`
            : "Os indicadores aparecerão aqui quando os dados forem conectados."
        }
      />

      <section aria-labelledby="quick-actions" className="space-y-3">
        <h2 id="quick-actions" className="text-sm font-semibold text-muted-foreground">
          Atalhos
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <OrderFormDialog
            trigger={
              <Button variant="ghost" className={quickActionClass}>
                <QuickAction
                  icon={ShoppingBasket}
                  title="Criar pedido"
                  description="Registrar um novo pedido"
                />
              </Button>
            }
          />
          <CustomerFormDialog
            trigger={
              <Button variant="ghost" className={quickActionClass}>
                <QuickAction
                  icon={UserPlus}
                  title="Cadastrar cliente"
                  description="Contato e endereço"
                />
              </Button>
            }
          />
          <ProductFormDialog
            trigger={
              <Button variant="ghost" className={quickActionClass}>
                <QuickAction
                  icon={Carrot}
                  title="Cadastrar produto"
                  description="Preço, unidade e estoque"
                />
              </Button>
            }
          />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <CycleCard
          icon={CalendarClock}
          title="Próximo ciclo de vendas"
          description="Defina os dias e o horário de abertura e encerramento das vendas."
          to="/calendario"
          cta="Ver calendário"
        />
        <CycleCard
          icon={Truck}
          title="Próxima entrega"
          description="A data da entrega será exibida após a configuração do ciclo de vendas."
          to="/entregas"
          cta="Ver entregas"
        />
      </div>

      <section aria-labelledby="indicators" className="space-y-3">
        <h2 id="indicators" className="text-sm font-semibold text-muted-foreground">
          Indicadores do ciclo
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="Pedidos no ciclo" icon={ShoppingBasket} />
          <StatCard label="Vendas no ciclo" icon={Wallet} />
          <StatCard label="Clientes cadastrados" icon={Users} />
          <StatCard label="Pedidos a separar" icon={PackageCheck} />
        </div>
      </section>

      <SectionCard title="Módulos do painel" description="Acesse cada área da operação.">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.filter((m) => m.id !== "dashboard").map((m) => (
            <li key={m.id}>
              <Link
                to={m.path}
                className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <m.icon className="size-4 shrink-0 text-primary" aria-hidden />
                <span className="text-sm font-medium text-foreground">{m.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>
    </PageStack>
  );
}

function CycleCard({
  icon: Icon,
  title,
  description,
  to,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  to: "/calendario" | "/entregas";
  cta: string;
}) {
  return (
    <div className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
        <Icon className="size-6" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <Badge variant="neutral">Não configurado</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button asChild variant="outline" className="h-11 md:h-9">
        <Link to={to}>
          <CalendarDays aria-hidden />
          {cta}
        </Link>
      </Button>
    </div>
  );
}
