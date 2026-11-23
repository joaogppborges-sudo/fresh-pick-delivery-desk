import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

type PendingButtonProps = Omit<ButtonProps, "disabled" | "onClick" | "children"> & {
  children: ReactNode;
};

/**
 * Botão de ação ainda não implementada: sempre desabilitado e com aviso visível,
 * para nunca aparentar funcionar sem executar nada.
 */
export function PendingButton({ children, ...props }: PendingButtonProps) {
  return (
    <Button {...props} disabled aria-disabled="true" title="Em desenvolvimento">
      {children}
      <span className="rounded bg-warning-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">
        Em breve
      </span>
    </Button>
  );
}
