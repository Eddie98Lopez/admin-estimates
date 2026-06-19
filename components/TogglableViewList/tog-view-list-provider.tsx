'use client';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const ViewToggles = () => {
  return (
    <TabsList>
      <TabsTrigger value="grid">
        <LayoutGrid />
      </TabsTrigger>
      <TabsTrigger value="list">
        <LayoutList />
      </TabsTrigger>
    </TabsList>
  );
};

export default ViewToggles;
