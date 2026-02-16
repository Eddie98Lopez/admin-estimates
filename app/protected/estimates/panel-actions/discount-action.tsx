import { Button } from '@/components/ui/button';
import { useEstimates } from '@/lib/estimates-provider';
import type { Discount } from '@/lib/estimates-provider';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tags } from 'lucide-react';

import React from 'react';

const standardDiscounts: Discount[] = [
  { type: 'percent', value: 10 },
  { type: 'percent', value: 15 },
  { type: 'percent', value: 20 },
];

const DiscountAction = () => {
  const { setDiscount, state } = useEstimates();
  const current = state.estimate.discount;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-[50px]">
          <Tags /> <span>Apply Discount</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Set Discount</DialogTitle>
        </DialogHeader>
        <div className="py-4 grid grid-cols-6 gap-4">
          {standardDiscounts.map((d, i) => (
            <Button
              key={`discount-${i}`}
              variant={'outline'}
              className={`text-xl col-span-2 min-h-[50px] ${current?.type === d.type && current?.value === d.value && 'border-green-400 bg-lime-50'}`}
              onClick={() => setDiscount(d)}
            >
              {d.value}
              <span>{d.type === 'percent' ? '%' : '$'}</span>
            </Button>
          ))}

          <DialogClose asChild>
            <Button
              variant={'outline'}
              className="text-xl col-span-3 min-h-[50px]"
              onClick={() => setDiscount(undefined)}
            >
              No Discount
            </Button>
          </DialogClose>
          <Button variant={'outline'} className="text-xl col-span-3 min-h-[50px]">
            Custom
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountAction;
