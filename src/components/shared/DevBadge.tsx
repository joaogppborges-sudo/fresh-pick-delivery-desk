import { Hammer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Indica claramente que um recurso ainda não está implementado. */
export function DevBadge({
  label = "Em desenvolvimento",
  className,
}: {
  label?: string;
  className?: string | undefined;
}) {
  return (
    <Badge variant="warning" className={cn("font-medium", className)}>
      <Hammer aria-hidden />
      {label}
    </Badge>
  );
}
