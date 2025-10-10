import { supabaseClient } from '@/lib/supabase/client';
import React from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(await params);
  const { data, error } = await supabaseClient.from('projects').select('*').eq('id', id);
  const project = await data[0];

  return (
    <div>
      <section className="flex flex-col gap-5">
        <Item variant="outline" className="p-8">
          <ItemHeader>
            <ItemTitle className="text-4xl">{project.title}</ItemTitle>
            <Button>Edit Project</Button>
          </ItemHeader>
          <ItemContent>badges badges badges</ItemContent>
          <Separator />
          <ItemContent>{project.description}</ItemContent>
        </Item>

        <Item variant="outline" className="p-8">
          Images/media
        </Item>
        <Item variant="outline" className="p-8">
          Item Links: github-repo , live-demo, wireframe-prototype, share
        </Item>
      </section>
    </div>
  );
};

export default page;
