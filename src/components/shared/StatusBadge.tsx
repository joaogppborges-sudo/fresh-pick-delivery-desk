import { Badge } from "@/components/ui/badge";
import type { StatusDef } from "@/lib/domain/status";

/** Badge de status do domínio (pedido, pagamento, entrega). */
export function StatusBadge({ status }: { status: StatusDef }) {
  return <Badge variant={status.tone}>{status.label}</Badge>;
}
