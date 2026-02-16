import { Button } from '@/components/ui/button';
import { Item, ItemContent } from '@/components/ui/item';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Coins } from 'lucide-react';
import { calculateAdjustedRange } from '@/lib/subtotalRange';
import { useEstimates } from '@/lib/estimates-provider';
import { Slider } from '@/components/ui/slider';

export const formatterUS = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function FinalPriceAction() {
  const { setAdjustedTotal } = useEstimates();
  const { estimate } = useEstimates().state;
  const range = calculateAdjustedRange(estimate.line_items, undefined, estimate.value_multiplier);

  const min = range.min;
  const max = range.max;
  const median = (max + min) / 2;

  const [price, setPrice] = useState(median);
  const [displayInput, setDisplayInput] = useState(false);

  useEffect(() => {
    setPrice((max + min) / 2);
  }, [min, max, median]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-h-[50px]">
          <Coins /> <span>Adjust Final Total</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Adjust Final price</DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4">
          {!displayInput && (
            <p className="text-center text-5xl font-bold h-auto" onClick={() => setDisplayInput(true)}>
              {formatterUS.format(price)}
            </p>
          )}
          {displayInput && (
            <div className="flex flex-row mx-auto text-5xl font-bold flex-grow items-center gap-3 content-center">
              <span>$</span>
              <Input
                className="text-center  !text-5xl !h-auto"
                value={price}
                min={min}
                max={max}
                inputMode="numeric"
                type="number"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <Button onClick={() => setDisplayInput(false)}>Set</Button>
            </div>
          )}
          <div className="flex gap-2 mb-4 text-xs">
            <p>{min}</p>
            <Slider
              step={1}
              min={min}
              max={max}
              value={[price]}
              onValueChange={(e) => {
                setPrice(e[0]);
              }}
            />
            <p>{max}</p>
          </div>
        </div>

        <DialogFooter>
          <div className=" w-full justify-center  gap-4 flex  text-center ">
            <DialogClose asChild>
              <Button variant={'secondary'} className="w-full min-h-[50px]" onClick={() => console.log('closed')}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild disabled={displayInput}>
              <Button className="w-full min-h-[50px]" onClick={() => setAdjustedTotal(price)}>
                Save
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
