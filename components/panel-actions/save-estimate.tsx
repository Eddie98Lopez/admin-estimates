import React from 'react';
import { Bookmark, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useEstimates } from '@/lib/estimates-provider';
import { formatterUS } from './final-total-action';
import { Item, ItemContent } from '../ui/item';
import { calculatePayments } from '@/lib/subtotalRange';
import { getDateIn30Days } from '@/lib/getDateIn30Days';
import type { LineItem } from '@/lib/estimates-provider';

const calculateEstHrSum = (array: LineItem[]) => {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum = sum + array[i].product.est_hrs;
  }
  return sum;
};

const SaveEstimateAction = () => {
  const { estimate } = useEstimates().state;
  const payments = calculatePayments(estimate.adjustedTotal, estimate.pay_schedule);
  const expires = getDateIn30Days();
  const hours = calculateEstHrSum(estimate.line_items);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="col-span-full min-h-[50px]">
          <Bookmark />
          <span>Save Estimate</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-6">
          <DialogTitle>Save Estimate</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 items-center">
            <h3 className="text-4xl font-bold">{formatterUS.format(estimate.adjustedTotal)}</h3>
            <div>
              <p className="text-xs">Expires: {expires.toLocaleDateString()}</p>
              <p className="text-xs">Approximate Hours: {hours}</p>
            </div>
          </div>
          <Item variant={'outline'}>
            <ItemContent className="flex flex-row gap-6 items-center">
              <User />
              <div>
                <p className="font-bold">Contact Name</p>
                <p className="text-xs">contact email</p>
              </div>
            </ItemContent>
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
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button variant={'secondary'} className="w-full h-[50px]">
                Keep Editing
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="w-full h-[50px]">Save Estimate</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveEstimateAction;
