'use client';
import React, { useActionState } from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToggleView } from './tog-view-list-provider';

const ToggableTabList = () => {
  const { setView } = useToggleView();
  return (
    <TabsList>
      <TabsTrigger value="grid" onClick={() => setView('grid')}>
        <LayoutGrid />
      </TabsTrigger>
      <TabsTrigger value="list" onClick={() => setView('list')}>
        <LayoutList />
      </TabsTrigger>
    </TabsList>
  );
};

export default ToggableTabList;
