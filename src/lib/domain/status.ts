/**
 * Vocabulário de status do domínio. Serve de base para os badges e, na v1.1.0,
 * para os enums do banco de dados. Não contém registros, apenas os estados possíveis.
 */
export type StatusTone = "neutral" | "info" | "warning" | "success" | "danger" | "primary";

export type StatusDef = { label: string; tone: StatusTone };

export const ORDER_STATUS = {
  recebido: { label: "Recebido", tone: "info" },
  confirmado: { label: "Confirmado", tone: "primary" },
  em_separacao: { label: "Em separação", tone: "warning" },
  separado: { label: "Separado", tone: "success" },
  em_rota: { label: "Em rota", tone: "info" },
  entregue: { label: "Entregue", tone: "success" },
  cancelado: { label: "Cancelado", tone: "danger" },
} as const satisfies Record<string, StatusDef>;

export const PAYMENT_STATUS = {
  pendente: { label: "Pagamento pendente", tone: "warning" },
  pago: { label: "Pago", tone: "success" },
  estornado: { label: "Estornado", tone: "danger" },
} as const satisfies Record<string, StatusDef>;

export const DELIVERY_STATUS = {
  aguardando: { label: "Aguardando", tone: "neutral" },
  em_rota: { label: "Em rota", tone: "info" },
  entregue: { label: "Entregue", tone: "success" },
  nao_entregue: { label: "Não entregue", tone: "danger" },
} as const satisfies Record<string, StatusDef>;

export const PAYMENT_METHODS = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  cartao: "Cartão",
} as const;

export const PRODUCT_CATEGORIES = {
  verduras: "Verduras",
  legumes: "Legumes",
  hortalicas: "Hortaliças",
} as const;

export type OrderStatus = keyof typeof ORDER_STATUS;
export type PaymentStatus = keyof typeof PAYMENT_STATUS;
export type DeliveryStatus = keyof typeof DELIVERY_STATUS;
export type PaymentMethod = keyof typeof PAYMENT_METHODS;
export type ProductCategory = keyof typeof PRODUCT_CATEGORIES;

export function toOptions(map: Record<string, string>) {
  return Object.entries(map).map(([value, label]) => ({ value, label }));
}

export function statusOptions(map: Record<string, StatusDef>) {
  return Object.entries(map).map(([value, def]) => ({ value, label: def.label }));
}
