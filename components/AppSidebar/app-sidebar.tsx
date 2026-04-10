import React from 'react';
import { Home, Settings, FileText } from 'lucide-react';
import { ThemeSwitcher } from '../theme-switcher';
import { LogoutButton } from '../logout-button';
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';

const salesLinks = [{ title: 'estimates', url: '/protected/sales', icon: FileText }];
const AppSidebar = () => {
  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader>[logo]</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/protected/">
                <Home />
                <span className={`capitalize `}>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {salesLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url + `/${item.title}`}>
                      <item.icon />
                      <span className="capitalize">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {' '}
          {/* ← add this wrapper */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/protected/settings">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a>
                <ThemeSwitcher />
                <span>Theme Switcher</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <LogoutButton /> {/* ← outside SidebarMenu, standalone */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
