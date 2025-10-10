'use client';
import React, { ReactNode, use, useState } from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToggleView } from './TogglableViewList/tog-view-list-provider';

type ListView = 'grid' | 'list' | 'table';

const setViewStyles = (view: ListView): string => {
  switch (view) {
    case 'list':
      return 'flex flex-col gap-5';

      break;

    default:
      return 'grid grid-cols-4 gap-8';
  }
};

const ToggableItemList = ({ children }: { children: ReactNode }) => {
  const { view } = useToggleView();

  return (
    <TabsContent value={view ?? 'grid'}>
      <ul className={setViewStyles(view)}>{children}</ul>
    </TabsContent>
  );
};

export default ToggableItemList;
