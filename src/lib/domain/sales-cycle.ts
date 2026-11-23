/**
 * Modelo operacional semanal informado pelo negócio: vendas de segunda a sexta,
 * entrega no sábado. O horário de encerramento é configurável e ainda não foi definido.
 */
export type WeekdayRole = "abertura" | "vendas" | "encerramento" | "entrega" | "sem_operacao";

export const WEEKLY_MODEL: { day: string; short: string; role: WeekdayRole }[] = [
  { day: "Segunda-feira", short: "Seg", role: "abertura" },
  { day: "Terça-feira", short: "Ter", role: "vendas" },
  { day: "Quarta-feira", short: "Qua", role: "vendas" },
  { day: "Quinta-feira", short: "Qui", role: "vendas" },
  { day: "Sexta-feira", short: "Sex", role: "encerramento" },
  { day: "Sábado", short: "Sáb", role: "entrega" },
  { day: "Domingo", short: "Dom", role: "sem_operacao" },
];

export const WEEKDAY_ROLE_LABEL: Record<WeekdayRole, string> = {
  abertura: "Abertura das vendas",
  vendas: "Vendas abertas",
  encerramento: "Encerramento das vendas",
  entrega: "Entregas",
  sem_operacao: "Sem operação",
};
