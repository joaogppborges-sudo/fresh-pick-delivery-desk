import {
  BarChart3,
  CalendarDays,
  Carrot,
  LayoutDashboard,
  MessageCircle,
  PackageCheck,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type ModuleGroup = "operacao" | "cadastros" | "gestao" | "sistema";

export const MODULE_GROUPS: { id: ModuleGroup; label: string }[] = [
  { id: "operacao", label: "Operação" },
  { id: "cadastros", label: "Cadastros" },
  { id: "gestao", label: "Gestão" },
  { id: "sistema", label: "Sistema" },
];

type ModuleDef = {
  id: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  group: ModuleGroup;
  /** Capacidades previstas, exibidas nas telas iniciais. */
  planned: readonly string[];
};

/** Fonte única dos módulos do painel: alimenta menu, cabeçalho, metadados e testes de rota. */
export const MODULES = [
  {
    id: "dashboard",
    path: "/",
    title: "Dashboard",
    shortTitle: "Início",
    description: "Visão geral do ciclo de vendas, pedidos e entregas da semana.",
    icon: LayoutDashboard,
    group: "operacao",
    planned: [
      "Indicadores do ciclo atual a partir dos pedidos reais",
      "Resumo da próxima entrega de sábado",
      "Alertas de estoque e pagamentos pendentes",
    ],
  },
  {
    id: "pedidos",
    path: "/pedidos",
    title: "Pedidos",
    shortTitle: "Pedidos",
    description: "Pedidos recebidos pelo site e, futuramente, pelo WhatsApp.",
    icon: ShoppingBasket,
    group: "operacao",
    planned: [
      "Registro de pedidos pelo painel e pelo site",
      "Acompanhamento de status do recebimento à entrega",
      "Controle de pagamento por Pix, dinheiro ou cartão",
    ],
  },
  {
    id: "separacao",
    path: "/separacao",
    title: "Separação de pedidos",
    shortTitle: "Separação",
    description: "Lista de separação dos pedidos fechados antes da entrega.",
    icon: PackageCheck,
    group: "operacao",
    planned: [
      "Lista consolidada de produtos a colher/separar",
      "Conferência item a item por pedido",
      "Marcação de pedidos prontos para entrega",
    ],
  },
  {
    id: "entregas",
    path: "/entregas",
    title: "Entregas e GPS",
    shortTitle: "Entregas",
    description: "Roteiro das entregas de sábado e acompanhamento em campo.",
    icon: Truck,
    group: "operacao",
    planned: [
      "Ordem de entrega por bairro e endereço",
      "Abertura do endereço no aplicativo de mapas",
      "Confirmação de entrega e recebimento no local",
    ],
  },
  {
    id: "calendario",
    path: "/calendario",
    title: "Calendário de vendas",
    shortTitle: "Calendário",
    description: "Abertura, encerramento e entrega de cada ciclo semanal.",
    icon: CalendarDays,
    group: "operacao",
    planned: [
      "Cadastro dos ciclos semanais de venda",
      "Horário configurável de encerramento",
      "Pausas e feriados sem entrega",
    ],
  },
  {
    id: "clientes",
    path: "/clientes",
    title: "Clientes",
    shortTitle: "Clientes",
    description: "Cadastro de clientes, endereços e histórico de compras.",
    icon: Users,
    group: "cadastros",
    planned: [
      "Cadastro com telefone, endereço e referência",
      "Histórico de pedidos por cliente",
      "Acesso do cliente por telefone e código de confirmação",
    ],
  },
  {
    id: "produtos",
    path: "/produtos",
    title: "Produtos e estoque",
    shortTitle: "Produtos",
    description: "Verduras, legumes e hortaliças disponíveis para venda.",
    icon: Carrot,
    group: "cadastros",
    planned: [
      "Cadastro de produtos com preço e unidade de venda",
      "Disponibilidade por ciclo de vendas",
      "Controle de estoque e baixa automática por pedido",
    ],
  },
  {
    id: "financeiro",
    path: "/financeiro",
    title: "Financeiro e caixa",
    shortTitle: "Financeiro",
    description: "Recebimentos, formas de pagamento e fechamento de caixa.",
    icon: Wallet,
    group: "gestao",
    planned: [
      "Recebimentos por Pix, dinheiro e cartão",
      "Abertura e fechamento de caixa do dia de entrega",
      "Controle de valores a receber",
    ],
  },
  {
    id: "relatorios",
    path: "/relatorios",
    title: "Relatórios",
    shortTitle: "Relatórios",
    description: "Análises de vendas, produtos, clientes e entregas.",
    icon: BarChart3,
    group: "gestao",
    planned: [
      "Vendas por ciclo e por período",
      "Produtos mais vendidos",
      "Exportação em planilha",
    ],
  },
  {
    id: "whatsapp",
    path: "/whatsapp",
    title: "WhatsApp e notificações",
    shortTitle: "WhatsApp",
    description: "Avisos de abertura de vendas, confirmação e saída para entrega.",
    icon: MessageCircle,
    group: "sistema",
    planned: [
      "Conexão com o WhatsApp do negócio",
      "Mensagens automáticas por etapa do pedido",
      "Recebimento de pedidos pelo WhatsApp",
    ],
  },
  {
    id: "usuarios",
    path: "/usuarios",
    title: "Usuários e permissões",
    shortTitle: "Usuários",
    description: "Quem acessa o painel e o que cada perfil pode fazer.",
    icon: ShieldCheck,
    group: "sistema",
    planned: [
      "Login do administrador",
      "Perfis de acesso com permissões por módulo",
      "Registro de atividades",
    ],
  },
  {
    id: "configuracoes",
    path: "/configuracoes",
    title: "Configurações",
    shortTitle: "Configurações",
    description: "Dados do negócio, ciclo de vendas, pagamentos e preferências.",
    icon: Settings,
    group: "sistema",
    planned: [
      "Dados do negócio e contato",
      "Dias e horários do ciclo de vendas",
      "Formas de pagamento aceitas",
    ],
  },
] as const satisfies readonly ModuleDef[];

export type AppModule = (typeof MODULES)[number];
export type ModuleId = AppModule["id"];
export type ModulePath = AppModule["path"];

export function getModule(id: ModuleId): AppModule {
  const found = MODULES.find((m) => m.id === id);
  if (!found) throw new Error(`Módulo desconhecido: ${id}`);
  return found;
}

export function findModuleByPath(pathname: string): AppModule | undefined {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return MODULES.find((m) => m.path === normalized);
}

/** Atalhos da barra inferior no celular (o restante fica no menu). */
export const MOBILE_NAV_IDS: ModuleId[] = ["dashboard", "pedidos", "separacao", "entregas"];
