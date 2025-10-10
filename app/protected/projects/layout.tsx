import React, { ReactNode } from 'react';
import ToggableViewProvider from '@/components/TogglableViewList/tog-view-list-provider';
import ToggableTabList from '@/components/TogglableViewList/tog-tab-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProjectsLayout = ({ children }: { children: ReactNode }) => {
  return <ToggableViewProvider>{children}</ToggableViewProvider>;
};

export default ProjectsLayout;
