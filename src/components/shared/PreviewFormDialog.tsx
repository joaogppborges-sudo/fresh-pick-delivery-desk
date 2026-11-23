import { useState, type ReactNode } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PendingButton } from "@/components/shared/PendingButton";

type PreviewFormDialogProps = {
  trigger: ReactNode;
  title: string;
  description: string;
  submitLabel: string;
  children: ReactNode;
};

/**
 * Diálogo de formulário reutilizável. Nesta versão, apresenta o formulário sem salvar:
 * o botão de envio permanece desabilitado até o banco de dados ser conectado.
 */
export function PreviewFormDialog({
  trigger,
  title,
  description,
  submitLabel,
  children,
}: PreviewFormDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92svh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div
          role="note"
          className="flex gap-2.5 rounded-lg bg-warning-soft p-3 text-sm text-warning"
        >
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            Pré-visualização do formulário. Os dados ainda não são salvos — o cadastro será
            conectado ao banco de dados na próxima etapa.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
          {children}
          <DialogFooter className="gap-2 pt-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-11 md:h-9">
                Fechar
              </Button>
            </DialogClose>
            <PendingButton type="submit" className="h-11 md:h-9">
              {submitLabel}
            </PendingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
