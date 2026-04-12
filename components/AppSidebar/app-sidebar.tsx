'use client';
import React from 'react';
import { Home, Settings, FileText } from 'lucide-react';
import { ThemeSwitcher } from '../theme-switcher';
import { LogoutButton } from '../logout-button';
import Link from 'next/link';
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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/protected/">
                  <Home />
                  <span className={`capitalize `}>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {salesLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url + `/${item.title}`}>
                      <item.icon />
                      <span className="capitalize">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/protected/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <ThemeSwitcher />
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
