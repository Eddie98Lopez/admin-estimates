import ProjectsList from '@/components/ProjectsList/projects-list';
import React from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import ProjectsLayout from './layout';
import { Tabs } from '@/components/ui/tabs';
import ToggableTabList from '@/components/TogglableViewList/tog-tab-list';

const getProjects = async (filters: { [key: string]: string | string[] | undefined }) => {
  if (Object.keys(filters).length !== 0) {
    return await supabaseClient
      .from('projects')
      .select('*')
      .filter(Object.keys(filters)[0], 'eq', filters[Object.keys(filters)[0]]);
  }
  return await supabaseClient.from('projects').select('*');
};

const page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const filters = await searchParams;
  console.log(filters);
  const { data, error } = await getProjects(filters);

  return (
    <ProjectsLayout>
      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-8">
          <div> "all" "drafts" "archived"</div>
          <ToggableTabList />
        </div>
        <ProjectsList projects={data} />
      </Tabs>
    </ProjectsLayout>
  );
};

export default page;
