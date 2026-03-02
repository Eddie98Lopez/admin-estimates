import { Button } from '@/components/ui/button';
import { Plus, Send, View } from 'lucide-react';
import { Item, ItemContent, ItemHeader } from '@/components/ui/item';
import { FileText, File, FileEdit } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const EstimatesPage = () => {
  return (
    <div>
      <header className="flex justify-between my-4">
        <p className="text-3xl font-bold ">Estimates</p>
        <Link href={'/protected/sales/estimates/calculator'}>
          <Button>
            <Plus /> <span>Create Estimate</span>
          </Button>
        </Link>
      </header>
      <div id="quick-stats" className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Item variant={'outline'} className="bg-background">
          <ItemContent>
            <ItemHeader className="justify-start font-bold">
              <FileText /> <span>All Estimates: {`(##)`}</span>
            </ItemHeader>
          </ItemContent>
        </Item>
        <Item variant={'outline'} className="bg-background">
          <ItemContent>
            <ItemHeader className="justify-start font-bold">
              <FileEdit /> <span>Draft Estimates: {`(##)`}</span>
            </ItemHeader>
          </ItemContent>
        </Item>
        <Item variant={'outline'} className="bg-background">
          <ItemContent>
            <ItemHeader className="justify-start font-bold">
              <Send /> <span>Sent Estimates: {`(##)`}</span>
            </ItemHeader>
          </ItemContent>
        </Item>
        <Item variant={'outline'} className="bg-background">
          <ItemContent>
            <ItemHeader className="justify-start font-bold">
              <View /> <span>Viewed Estimates: {`(##)`}</span>
            </ItemHeader>
          </ItemContent>
        </Item>
      </div>
      <div></div>
    </div>
  );
};

export default EstimatesPage;
