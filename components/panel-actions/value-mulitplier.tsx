import React from 'react';
import { Button } from '@/components/ui/button';
import { useEstimates } from '@/lib/estimates-provider';
import { BarChart4 } from 'lucide-react';
import type { ValueMulitiplier } from '@/lib/estimates-provider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const standardValueMultipliers: ValueMulitiplier[] = [1.1, 1.2, 1.4];

const ValueMultiplierAction = () => {
  const { setValueMultiplier } = useEstimates();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-[50px]">
          <BarChart4 /> <span>Value Mulitplier</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Value Multiplier</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-3">
          {standardValueMultipliers.map((multipler, i) => (
            <Button
              key={`multiplier-${i}`}
              onClick={() => setValueMultiplier(multipler)}
              className="col-span-2 h-[60px] text-xl gap-0"
              variant={'outline'}
            >
              {multipler}
            </Button>
          ))}

          <Button
            onClick={() => setValueMultiplier(1.1)}
            className="col-span-3 h-[60px] text-xl gap-0"
            variant={'outline'}
          >
            Reset to default
          </Button>
          <Button className="col-span-3 h-[60px] text-xl gap-0" variant={'outline'}>
            Custom
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValueMultiplierAction;
