import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, ShieldCheck, Smartphone, UserCog, UserPlus } from "lucide-react";
import { PageStack } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable, type Column } from "@/components/shared/DataTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { SectionCard } from "@/components/shared/SectionCard";
import { ModulePlan } from "@/components/shared/ModulePlan";
import { PendingButton } from "@/components/shared/PendingButton";
import type { UserRow } from "@/lib/domain/types";
import { getModule } from "@/lib/modules";
import { pageHead } from "@/lib/seo";

const mod = getModule("usuarios");

export const Route = createFileRoute("/usuarios")({
  head: () => pageHead(mod.title, mod.description),
  component: UsersPage,
});

const columns: Column<UserRow>[] = [
  { id: "name", header: "Nome", cell: (r) => r.name, primary: true },
  { id: "phone", header: "Telefone", cell: (r) => r.phone },
  { id: "role", header: "Perfil", cell: (r) => r.role },
];

const ACCESS_TYPES = [
  {
    icon: KeyRound,
    title: "Administrador",
    description: "Acesso completo ao painel: pedidos, entregas, financeiro e configurações.",
  },
  {
    icon: Smartphone,
    title: "Cliente",
    description: "Acesso ao site para fazer pedidos, entrando com telefone e código de confirmação.",
  },
];

function UsersPage() {
  const rows: UserRow[] = [];

  return (
    <PageStack>
      <PageHeader
        title={mod.title}
        description={mod.description}
        icon={mod.icon}
        actions={
          <PendingButton className="h-11 md:h-9">
            <UserPlus aria-hidden />
            Convidar usuário
          </PendingButton>
        }
      />

      <DataTable
        caption="Usuários do painel"
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        empty={
          <EmptyState
            icon={UserCog}
            title="Nenhum usuário cadastrado"
            description="Os acessos ao painel serão criados quando o login for implementado."
          />
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Tipos de acesso" description="Definição inicial, sujeita a revisão.">
          <ul className="space-y-4">
            {ACCESS_TYPES.map((a) => (
              <li key={a.title} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <a.icon className="size-4" aria-hidden />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
        <ModulePlan items={mod.planned} />
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-4" aria-hidden />
        As permissões serão aplicadas no servidor, não apenas na tela.
      </p>
    </PageStack>
  );
}
