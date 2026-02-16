'use client';

import * as React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type MinMaxPriceSliderProps = {
  min: number; // e.g. 1500
  max: number; // e.g. 4500
  value: number; // selected price
  onChange: (next: number) => void;

  step?: number; // e.g. 50
  currency?: string; // e.g. "USD"
  showInput?: boolean; // allow typing exact price
  label?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function MinMaxPriceSlider({
  min,
  max,
  value,
  onChange,
  step = 50,
  currency = 'USD',
  showInput = true,
  label = 'Set price',
}: MinMaxPriceSliderProps) {
  const safeValue = clamp(value, min, max);

  const midpoint = React.useMemo(() => {
    // rounds midpoint to the nearest step so the slider and number agree
    const mid = (min + max) / 2;
    return Math.round(mid / step) * step;
  }, [min, max, step]);

  // Slider expects number[] even for single-thumb
  const sliderValue = React.useMemo(() => [safeValue], [safeValue]);

  return (
    <div className="space-y-3 rounded-2xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-2xl font-semibold">{formatMoney(safeValue, currency)}</p>
          <p className="text-xs text-muted-foreground">
            Range: {formatMoney(min, currency)} – {formatMoney(max, currency)}
          </p>
        </div>

        <Button type="button" variant="secondary" onClick={() => onChange(clamp(midpoint, min, max))}>
          Use midpoint
        </Button>
      </div>

      <Slider
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onChange(clamp(vals[0] ?? min, min, max))}
      />

      {showInput && (
        <div className="flex items-center gap-2">
          <Input
            inputMode="numeric"
            value={safeValue}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, '');
              const next = raw === '' ? min : Number(raw);
              onChange(clamp(next, min, max));
            }}
          />
          <span className="text-xs text-muted-foreground">Exact</span>
        </div>
      )}
    </div>
  );
}
