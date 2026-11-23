import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { MOBILE_NAV_IDS, MODULES, findModuleByPath } from "@/lib/modules";
import { cn } from "@/lib/utils";

const itemClass =
  "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Navegação inferior para uso com uma mão no celular. */
export function MobileNav() {
  const { toggleSidebar } = useSidebar();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = findModuleByPath(pathname)?.id;
  const items = MODULES.filter((m) => MOBILE_NAV_IDS.includes(m.id));

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="flex items-stretch gap-1 py-1">
        {items.map((m) => {
          const active = activeId === m.id;
          return (
            <li key={m.id} className="flex flex-1">
              <Link
                to={m.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  itemClass,
                  active ? "bg-primary-soft text-primary" : "text-muted-foreground",
                )}
              >
                <m.icon className="size-5" aria-hidden />
                {m.shortTitle}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1">
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(itemClass, "text-muted-foreground")}
          >
            <Menu className="size-5" aria-hidden />
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
