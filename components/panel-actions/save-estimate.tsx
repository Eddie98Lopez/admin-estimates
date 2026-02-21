import React from 'react';
import { Bookmark } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useEstimates } from '@/lib/estimates-provider';
import { formatterUS } from './final-total-action';
import { Item, ItemContent } from '../ui/item';
import { calculatePayments } from '@/lib/subtotalRange';
import { getDateIn30Days } from '@/lib/getDateIn30Days';

const SaveEstimateAction = () => {
  const { estimate } = useEstimates().state;
  const payments = calculatePayments(estimate.adjustedTotal, estimate.pay_schedule);
  const expires = getDateIn30Days();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="col-span-full min-h-[50px]">
          <Bookmark />
          <span>Save Quote</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Quote</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-4xl font-bold">{formatterUS.format(estimate.adjustedTotal)}</h3>
            <p className="text-xs">Expires: {expires.toLocaleDateString()}</p>
          </div>
          <Item variant={'outline'}>
            <ItemContent>Contact info</ItemContent>
          </Item>
          <div>
            <h4 className="text-xs font-bold uppercase">Line Items:</h4>
            <ul className="bg-secondary">
              {estimate.line_items.map((item, i) => {
                const { product, quantity } = item;
                return (
                  <Item key={`line-item-${i + 1}`} className="border-[0]  border-b  border-background">
                    <ItemContent className="flex flex-row gap-6 items-center">
                      <p>{i + 1}</p>
                      <div>
                        <h3 className="font-bold ">{product.product_name}</h3>
                        <p className="text-xs">{product.shortDescription}</p>
                      </div>
                      <p className="ml-auto">qty: {quantity}</p>
                    </ItemContent>
                  </Item>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase">Payments:</h4>
            <ul className="flex flex-col bg-secondary">
              {payments.map((payment, i) => {
                return (
                  <Item
                    key={`payment-${i + 1}`}
                    variant={'outline'}
                    className="py-2 border-0 border-b border-background"
                  >
                    <ItemContent className="flex flex-row gap-6">
                      <p>{i + 1}</p>
                      <p>{payment.type}</p>
                      <p className="ml-auto">{payment.amount}</p>
                    </ItemContent>
                  </Item>
                );
              })}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant={'secondary'} className="w-full h-[50px]">
                Keep Editing
              </Button>
            </DialogClose>
            <DialogClose>
              <Button className="w-full h-[50px]">Save Estimate</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveEstimateAction;
