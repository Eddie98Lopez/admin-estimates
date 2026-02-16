import type { Discount } from './estimates-provider';
import type { LineItem } from './estimates-provider';

function roundToTwo(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function calculateAdjustedRange(
  array: LineItem[],
  discount: Discount | undefined,
  multiplier: number | undefined,
) {
  let min = 0;
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    min = array[i].product.min * array[i].quantity + min;
    max = array[i].product.max * array[i].quantity + max;
  }

  if (discount) {
    const { type, value } = discount;
    if (type === 'flat') {
      min = min - value;
      max = max - value;
    }
    if (type === 'percent') {
      min = min - min * (value / 100);
      max = max - max * (value / 100);
    }
  }

  if (multiplier) {
    min = min * multiplier;
    max = max * multiplier;
  }

  min = roundToTwo(min);
  max = roundToTwo(max);

  return { max, min };
}

export function calculateSubtotalRange(array: LineItem[]) {
  let min = 0;
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    min = array[i].product.min * array[i].quantity + min;
    max = array[i].product.max * array[i].quantity + max;
  }

  return { max, min };
}
