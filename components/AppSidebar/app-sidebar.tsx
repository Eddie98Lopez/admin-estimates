'use client';
import React from 'react';
import { Users, Building2, Folder, Home, Settings } from 'lucide-react';
import { ThemeSwitcher } from '../theme-switcher';
import { LogoutButton } from '../logout-button';
import { useSidebar } from '@/components/ui/sidebar';
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

const salesLinks = [
  { title: 'contacts', url: '/protected/sales', icon: Users },
  { title: 'organizations', url: '/protected/sales', icon: Building2 },
];
const AppSidebar = () => {
  const { open } = useSidebar();
  return (
    <Sidebar className={`relative max-w-none ${!open && 'w-12'} `} collapsible="icon" side="left">
      <SidebarHeader>[logo]</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/protected/">
                <Home />
                <span className={`capitalize ${!open && 'w-0'}`}>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/protected/projects">
                <Folder />
                <span className="capitalize">All Projects</span>
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
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href="#">
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

        <SidebarGroup>
          <LogoutButton />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
