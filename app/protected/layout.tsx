import { DeployButton } from '@/components/deploy-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { hasEnvVars } from '@/lib/utils';
import Link from 'next/link';
import { Sidebar } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppBreadcrumbs from '@/components/breadcrumbs';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="grid w-full" style={{ gridTemplateColumns: 'auto 1fr' }}>
        <AppSidebar />

        <main className="overflow-auto max-h-screen">
          <div>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-blue-600">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm bg-blue-400">
                {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
              </div>
            </nav>

            <div className="flex items-center gap-5">
              <SidebarTrigger />
              <AppBreadcrumbs />
            </div>

            <div className="flex-1 flex flex-col gap-20 p-8 px-20 min-h-screen">{children}</div>

            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <ThemeSwitcher />
            </footer>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
