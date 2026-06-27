import { Button } from '@/components/ui/button';
import { Plus, Send, View, FileText, FileEdit } from 'lucide-react';
import { DataCard } from '@/components/ui/data-card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Item } from '@/components/ui/item';
import ViewToggle from '@/components/TogglableViewList/tog-view-list-provider';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/server';

const EstimatesPage = async () => {
  const supabase = await createClient();
  const { data: estimates } = await supabase.from('estimates').select(`
    *,
    organization:org_id ( * ),
    recipient:recipient_id ( * )
  `);
  console.log(estimates);
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

      <div id="quick-stats" className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <DataCard icon={<FileText />} label="All Estimates:" measurement={estimates.length} />
        <DataCard
          icon={<FileEdit />}
          label="Draft Estimates:"
          measurement={estimates.filter((est) => est.status == 'draft').length}
        />
        <DataCard
          icon={<Send />}
          label="Sent Estimates:"
          measurement={estimates.filter((est) => est.sent_at !== null).length}
        />
        <DataCard
          icon={<View />}
          label="Viewed Estimates:"
          measurement={estimates.filter((est) => est.viewed_at !== null).length}
        />
      </div>

      <Tabs defaultValue="grid">
        <ViewToggle />
        <TabsContent value="grid">
          <div className="grid grid-cols-4 gap-3">
            <Item variant="outline" className="flex flex-col items-start justify-between min-h-[200px]">
              <div className="flex justify-start items-center gap-2">
                <Avatar>
                  <AvatarFallback>FL</AvatarFallback>
                </Avatar>{' '}
                First Last
              </div>

              <p className="font-bold text-4xl">$12,000</p>
              <div className="flex justify-between w-full">
                <div>
                  <p className="color-grey">00001</p>
                  <p>expires: 1/12/27</p>
                </div>
                <Badge variant={`secondary`}>Sent</Badge>
              </div>
            </Item>
            <Item variant="outline">2</Item>
            <Item variant="outline">3</Item>
            <Item variant="outline">4</Item>
          </div>
        </TabsContent>
        <TabsContent value="list">List Content</TabsContent>
      </Tabs>
    </div>
  );
};

export default EstimatesPage;
