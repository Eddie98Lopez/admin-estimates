import { Button } from '@/components/ui/button';
import { Plus, Send, View, FileText, FileEdit } from 'lucide-react';
import { DataCard } from '@/components/ui/data-card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import ViewToggle from '@/components/TogglableViewList/tog-view-list-provider';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getEstimates } from './actions/getEstimates';

function formatCurrency(value: number | string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value));
}

const EstimatesPage = async () => {
  const estimates = await getEstimates();
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
          <div className="flex ">
            {estimates.map((est) => (
              <Link key={`estimate-${est.id}`} href={`/protected/sales/estimates/${est.id}`}>
                <Card className="flex-col items-stretch gap-3 min-w-sm rounded-lg border p-4 transition-colors hover:bg-accent hover:border-accent-foreground/20">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-mono text-sm font-semibold tracking-tight">
                      {est.estimate_number_formatted}
                    </CardTitle>
                    <Badge variant="secondary">{est.status}</Badge>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="truncate font-medium text-foreground">{est.organization.org_name}</div>
                    <div className="truncate text-sm text-muted-foreground">
                      {est.recipient.first_name} {est.recipient.last_name}
                    </div>
                  </div>

                  <div className="mt-1 flex items-baseline justify-between border-t pt-3">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-lg font-semibold tabular-nums">{formatCurrency(est.final_total)}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">List Content</TabsContent>
      </Tabs>
    </div>
  );
};

export default EstimatesPage;
