'use client';
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import type { Product } from './dummyData';

export type LineItem = {
  product: Product;
  quantity: number;
  // Optional: allow manual override later if you want
  // notes?: string;
};

export type Discount = {
  type: 'flat' | 'percent';
  value: number; // flat = dollars, percent = 0-100
};

export type Estimate = {
  line_items: LineItem[]; // keep it as [] instead of null to simplify
  customer_id?: string;
  adjustedTotal?: number;

  discount?: Discount;

  // Example: [50, 50] or [30, 70]
  pay_schedule: number[];

  value_multiplier: 1 | 1.1 | 1.2 | 1.4;

  // Optional metadata fields you’ll probably add soon
  // status?: "draft" | "sent" | "viewed" | "accepted" | "expired";
  // notes?: string;
};

type EstimatesState = {
  estimate: Estimate;
};

const initialEstimate: Estimate = {
  line_items: [],
  customer_id: undefined,
  discount: undefined,
  pay_schedule: [50, 25, 25],
  value_multiplier: 1.1,
};

const initialState: EstimatesState = {
  estimate: initialEstimate,
};

// ---------- reducer actions ----------
type Action =
  | { type: 'RESET_ESTIMATE'; payload?: Partial<Estimate> }
  | { type: 'SET_CUSTOMER_ID'; payload?: string }
  | { type: 'SET_VALUE_MULTIPLIER'; payload: Estimate['value_multiplier'] }
  | { type: 'SET_DISCOUNT'; payload?: Discount }
  | { type: 'CLEAR_DISCOUNT' }
  | { type: 'SET_ADJUSTED_TOTAL'; payload: number }
  | { type: 'SET_PAY_SCHEDULE'; payload: number[] }
  | { type: 'ADD_LINE_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'UPSERT_LINE_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'SET_LINE_ITEM_QTY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_LINE_ITEM'; payload: { productId: string } }
  | { type: 'CLEAR_LINE_ITEMS' };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeSchedule(schedule: number[]): number[] {
  // Clean + clamp 0-100, drop zeros; default to [100]
  const cleaned = (schedule ?? []).map((n) => (Number.isFinite(n) ? clamp(n, 0, 100) : 0)).filter((n) => n > 0);

  return cleaned.length ? cleaned : [100];
}

function sanitizeDiscount(d?: Discount): Discount | undefined {
  if (!d) return undefined;

  if (d.type === 'flat') {
    return { type: 'flat', value: Math.max(0, d.value) };
  }

  // percent
  return { type: 'percent', value: clamp(d.value, 0, 100) };
}

function reducer(state: EstimatesState, action: Action): EstimatesState {
  const e = state.estimate;

  switch (action.type) {
    case 'RESET_ESTIMATE': {
      const next: Estimate = {
        ...initialEstimate,
        ...action.payload,
        // ensure the required ones are normalized
        line_items: action.payload?.line_items ?? initialEstimate.line_items,
        pay_schedule: normalizeSchedule(action.payload?.pay_schedule ?? initialEstimate.pay_schedule),
        discount: sanitizeDiscount(action.payload?.discount),
      };
      return { estimate: next };
    }

    case 'SET_CUSTOMER_ID':
      return { estimate: { ...e, customer_id: action.payload } };

    case 'SET_VALUE_MULTIPLIER':
      return { estimate: { ...e, value_multiplier: action.payload } };

    case 'SET_DISCOUNT':
      return { estimate: { ...e, discount: sanitizeDiscount(action.payload) } };

    case 'CLEAR_DISCOUNT':
      return { estimate: { ...e, discount: undefined } };

    case 'SET_ADJUSTED_TOTAL':
      return { estimate: { ...e, adjustedTotal: action.payload } };

    case 'SET_PAY_SCHEDULE':
      return { estimate: { ...e, pay_schedule: normalizeSchedule(action.payload) } };

    case 'ADD_LINE_ITEM': {
      const { product } = action.payload;
      const addQty = action.payload.quantity ?? 1;

      const qtyToAdd = Math.max(1, Math.floor(addQty));
      const existing = e.line_items.find((li) => li.product._id === product._id);

      if (existing) {
        return {
          estimate: {
            ...e,
            line_items: e.line_items.map((li) =>
              li.product._id === product._id ? { ...li, quantity: li.quantity + qtyToAdd } : li,
            ),
          },
        };
      }

      return {
        estimate: {
          ...e,
          line_items: [...e.line_items, { product, quantity: qtyToAdd }],
        },
      };
    }

    case 'UPSERT_LINE_ITEM': {
      const { product, quantity } = action.payload;
      const qty = Math.max(0, Math.floor(quantity));

      const exists = e.line_items.some((li) => li.product._id === product._id);

      const nextItems = exists
        ? e.line_items.map((li) => (li.product._id === product._id ? { ...li, product, quantity: qty } : li))
        : [...e.line_items, { product, quantity: qty }];

      // auto-remove if qty hits 0
      return {
        estimate: {
          ...e,
          line_items: nextItems.filter((li) => li.quantity > 0),
        },
      };
    }

    case 'SET_LINE_ITEM_QTY': {
      const { productId, quantity } = action.payload;
      const qty = Math.max(0, Math.floor(quantity));

      const nextItems = e.line_items
        .map((li) => (li.product._id === productId ? { ...li, quantity: qty } : li))
        .filter((li) => li.quantity > 0);

      return { estimate: { ...e, line_items: nextItems } };
    }

    case 'REMOVE_LINE_ITEM':
      return {
        estimate: {
          ...e,
          line_items: e.line_items.filter((li) => li.product._id !== action.payload.productId),
        },
      };

    case 'CLEAR_LINE_ITEMS':
      return { estimate: { ...e, line_items: [] } };

    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}

// ---------- context ----------
type EstimatesContextValue = {
  state: EstimatesState;
  dispatch: Dispatch<Action>;

  // Convenience methods (you can use dispatch directly if you want)
  resetEstimate: (partial?: Partial<Estimate>) => void;

  setCustomerId: (id?: string) => void;
  setValueMultiplier: (m: Estimate['value_multiplier']) => void;

  setDiscount: (d?: Discount) => void;
  clearDiscount: () => void;

  setPaySchedule: (schedule: number[]) => void;
  setAdjustedTotal: (total: number) => void;

  addLineItem: (product: Product, quantity?: number) => void;
  upsertLineItem: (product: Product, quantity: number) => void;
  setLineItemQty: (productId: string, quantity: number) => void;
  removeLineItem: (productId: string) => void;
  clearLineItems: () => void;
};

const EstimatesContext = createContext<EstimatesContextValue | null>(null);

export function useEstimates() {
  const ctx = useContext(EstimatesContext);
  if (!ctx) throw new Error('useEstimates must be used within <EstimatesProvider />');
  return ctx;
}

export function EstimatesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<EstimatesContextValue>(
    () => ({
      state,
      dispatch,

      resetEstimate: (partial) => dispatch({ type: 'RESET_ESTIMATE', payload: partial }),

      setCustomerId: (id) => dispatch({ type: 'SET_CUSTOMER_ID', payload: id }),
      setValueMultiplier: (m) => dispatch({ type: 'SET_VALUE_MULTIPLIER', payload: m }),
      setAdjustedTotal: (total) => dispatch({ type: 'SET_ADJUSTED_TOTAL', payload: total }),

      setDiscount: (d) => dispatch({ type: 'SET_DISCOUNT', payload: d }),
      clearDiscount: () => dispatch({ type: 'CLEAR_DISCOUNT' }),

      setPaySchedule: (schedule) => dispatch({ type: 'SET_PAY_SCHEDULE', payload: schedule }),

      addLineItem: (product, quantity) => dispatch({ type: 'ADD_LINE_ITEM', payload: { product, quantity } }),

      upsertLineItem: (product, quantity) => dispatch({ type: 'UPSERT_LINE_ITEM', payload: { product, quantity } }),

      setLineItemQty: (productId, quantity) =>
        dispatch({ type: 'SET_LINE_ITEM_QTY', payload: { productId, quantity } }),

      removeLineItem: (productId) => dispatch({ type: 'REMOVE_LINE_ITEM', payload: { productId } }),

      clearLineItems: () => dispatch({ type: 'CLEAR_LINE_ITEMS' }),
    }),
    [state],
  );

  return <EstimatesContext.Provider value={value}>{children}</EstimatesContext.Provider>;
}
