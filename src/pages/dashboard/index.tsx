import { Outlet } from 'react-router';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { LangSwitcher } from '@/features/lang-switcher/lang-switcher';
import { ThemeSwitcher } from '@/features/theme-switcher/theme-switcher';
import DashboardSidebar from '@/pages/dashboard/dashboard-sidebar';
import UserDropdown from '@/pages/dashboard/user-dropdown';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex gap-4">
            <ThemeSwitcher />
            <LangSwitcher />
            <UserDropdown />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
