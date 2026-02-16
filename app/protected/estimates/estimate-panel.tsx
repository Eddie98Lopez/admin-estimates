import React from 'react';
import { Item } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { Bookmark, Tags, CalendarClock, User, BarChart4 } from 'lucide-react';
import { useEstimates } from '@/lib/estimates-provider';
import DiscountAction from './panel-actions/discount-action';
import { FinalPriceAction } from './panel-actions/final-total-action';
import { calculateAdjustedRange, calculateSubtotalRange } from '@/lib/subtotalRange';

export const formatterUS = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const EstimateActionButtons = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-3 w-full grow-2">
      <Button className="col-span-full min-h-[50px]">
        <Bookmark />
        <span>Save Quote</span>
      </Button>
      <FinalPriceAction />
      <Button variant="outline" className="min-h-[50px]">
        <CalendarClock /> <span>Add Pay Schedule</span>
      </Button>
      <DiscountAction />
      <Button variant="outline" className="min-h-[50px]">
        <BarChart4 /> <span>Value Mulitplier</span>
      </Button>
      <Button variant="outline" className="col-span-full min-h-[50px]">
        <User /> <span>Select Customer</span>
      </Button>
    </div>
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
        <h2 className="text-2xl font-bold">Current Quote</h2>
        <ul className="overflow-y-scroll h-full max-h-[400px]">
          {line_items.map((line_item, i) => (
            <li
              key={`line-item-${i}`}
              className="grid grid-cols-[2fr_1fr] justify-between w-full items-center gap-3 py-2 border-b border-border"
            >
              <div className="1 min-w-0">
                <p className="text-ellipsis font-bold truncate">{line_item.product.product_name}</p>
                <p className="text-ellipsis truncate text-sm ">{line_item.product.shortDescription}</p>
                <p>
                  ${line_item.product.min} - ${line_item.product.max}
                </p>
              </div>

              <div className="flex items-center gap-2 justify-self-end">
                <Button
                  onClick={() => setLineItemQty(line_item.product._id, line_item.quantity - 1)}
                  variant={'secondary'}
                >
                  -
                </Button>
                <span>{line_item.quantity}</span>
                <Button onClick={() => addLineItem(line_item.product)}>+</Button>
              </div>
            </li>
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
            <p>Discount</p>{' '}
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
