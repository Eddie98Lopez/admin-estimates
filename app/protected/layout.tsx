import { ThemeSwitcher } from '@/components/theme-switcher';

import AppSidebar from '@/components/AppSidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppBreadcrumbs from '@/components/breadcrumbs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* No SidebarInset — the sidebar-gap div inside <Sidebar> handles the offset */}
      <div className="flex flex-1 flex-col min-h-svh">
        <header className="flex h-12 items-center gap-4 px-4 border-b">
          <SidebarTrigger />
          <AppBreadcrumbs />
        </header>
        <main className="flex-1 px-8 py-6">{children}</main>
        <footer className="flex items-center justify-center border-t text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>
      </div>
    </SidebarProvider>
  );
}
