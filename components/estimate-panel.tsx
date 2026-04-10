import React from 'react';
import { Item, ItemHeader } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useEstimates } from '@/lib/estimates-provider';
import {
  SaveEstimateAction,
  DiscountAction,
  FinalPriceAction,
  ValueMultiplierAction,
  PayScheduleAction,
} from './panel-actions';
import { calculateAdjustedRange, calculateSubtotalRange } from '@/lib/subtotalRange';
import type { LineItem } from '@/lib/estimates-provider';

export const formatterUS = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const EstimateActionButtons = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-3 w-full grow-2">
      <DiscountAction />
      <ValueMultiplierAction />

      <PayScheduleAction />
      <FinalPriceAction />
      <Button variant="outline" className="col-span-full min-h-[50px]">
        <User /> <span>Select Customer</span>
      </Button>
      <SaveEstimateAction />
    </div>
  );
};

const LineItem = ({ item, add1Item, minus1Item }: { item: LineItem; add1Item: () => void; minus1Item: () => void }) => {
  return (
    <li className="grid grid-cols-[2fr_1fr] justify-between w-full items-center gap-3 py-2 border-b border-border">
      <div className="1 min-w-0">
        <p className="text-ellipsis font-bold truncate">{item.product.product_name}</p>
        <p className="text-ellipsis truncate text-sm ">{item.product.shortDescription}</p>
        <p>
          ${item.product.min} - ${item.product.max}
        </p>
      </div>

      <div className="flex items-center gap-2 justify-self-end">
        <Button onClick={minus1Item} variant={'secondary'}>
          -
        </Button>
        <span>{item.quantity}</span>
        <Button onClick={add1Item}>+</Button>
      </div>
    </li>
  );
};

const EstimatePanel = () => {
  const { state, addLineItem, setLineItemQty } = useEstimates();
  const { discount, value_multiplier, line_items, adjustedTotal } = state.estimate;

  const subtotalRange = calculateSubtotalRange(line_items);
  const adjustedRange = calculateAdjustedRange(line_items, discount, value_multiplier);

  return (
    <Item variant="outline" className=" min-h-[85vh] grid grid-rows-[1fr_auto] items-start gap-2 bg-background p-6">
      <div className="h-full">
        <ItemHeader className="text-2xl font-bold">Estimate Calculator</ItemHeader>
        <ul className="overflow-y-scroll h-full max-h-[400px]">
          {line_items.map((line_item, i) => (
            <LineItem
              key={`line_item-${i}`}
              item={line_item}
              add1Item={() => {
                addLineItem(line_item.product);
              }}
              minus1Item={() => {
                setLineItemQty(line_item.product._id, line_item.quantity - 1);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="w-full h-full">
        <div className="border-border border-t mb-4 py-3 flex flex-col gap-1 ">
          <div className="flex justify-between text-muted-foreground text-xs">
            <p>Subtotal</p>
            <p>
              ${subtotalRange.min} - ${subtotalRange.max}
            </p>
          </div>
          <div className="flex justify-between text-muted-foreground text-xs">
            <p>Discount</p>
            {discount == null ? (
              <p>--</p>
            ) : (
              <p>
                -{discount.type == 'flat' && '$'}
                {discount.value}
                {discount.type == 'percent' && '%'}
              </p>
            )}
          </div>
          <div className="flex justify-between text-muted-foreground text-xs">
            <p>Value Multiplier</p> <p>{value_multiplier}</p>
          </div>
          <div className="flex justify-between muted-foreground text-xs font-bold">
            <p>Adjusted Range</p>{' '}
            <p>
              ${adjustedRange.min} - ${adjustedRange.max}
            </p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Suggested Total</p>
            <p>{formatterUS.format((adjustedRange.max + adjustedRange.min) / 2)}</p>
          </div>

          {adjustedTotal && (
            <div className="flex justify-between font-bold my-2 text-xl font-bold">
              <p>Adjusted Total</p>
              <p>{formatterUS.format(adjustedTotal)}</p>
            </div>
          )}
        </div>
        <EstimateActionButtons />
      </div>
    </Item>
  );
};

export default EstimatePanel;
