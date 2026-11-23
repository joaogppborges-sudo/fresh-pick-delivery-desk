import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  hint?: string | undefined;
  error?: string | undefined;
  required?: boolean;
  className?: string | undefined;
};

/** Rótulo, controle, dica e erro com espaçamento e acessibilidade padronizados. */
export function FormField({ id, label, children, hint, error, required, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Classe padrão para campos confortáveis ao toque. */
export const fieldClass = "h-11 md:h-10";
