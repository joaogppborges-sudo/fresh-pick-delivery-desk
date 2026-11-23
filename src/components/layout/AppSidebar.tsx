import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { BrandMark } from "@/components/layout/BrandMark";
import { MODULES, MODULE_GROUPS, findModuleByPath } from "@/lib/modules";
import { APP_STAGE, APP_VERSION } from "@/lib/app-info";

export function AppSidebar() {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeId = findModuleByPath(pathname)?.id;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <BrandMark showText={!collapsed} />
      </SidebarHeader>

      <SidebarContent className="pb-4">
        {MODULE_GROUPS.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel className="text-sidebar-muted">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {MODULES.filter((m) => m.group === group.id).map((m) => (
                  <SidebarMenuItem key={m.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeId === m.id}
                      tooltip={m.title}
                      className="h-10 data-[active=true]:font-semibold"
                    >
                      <Link to={m.path} onClick={() => isMobile && setOpenMobile(false)}>
                        <m.icon aria-hidden />
                        <span>{m.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        {collapsed ? (
          <p className="text-center text-[10px] font-semibold text-sidebar-muted">v{APP_VERSION}</p>
        ) : (
          <div className="text-xs text-sidebar-muted">
            <p className="font-semibold text-sidebar-foreground">Versão {APP_VERSION}</p>
            <p>{APP_STAGE}</p>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
