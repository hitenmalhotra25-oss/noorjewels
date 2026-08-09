import { useSyncExternalStore } from "react";
import { formatMoney } from "@/lib/locale";

export type CartItem = {
  key: string; // `${id}::${carat}`
  id: string;
  name: string;
  image: string;
  category: string;
  price: string;
  priceNum: number;
  carat: string;
  qty: number;
};

const STORAGE_KEY = "noor.cart.v1";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

let items: CartItem[] = load();
const listeners = new Set<() => void>();

function emit() {
  save(items);
  listeners.forEach((l) => l());
}

export const cart = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get(): CartItem[] {
    return items;
  },
  add(input: Omit<CartItem, "key" | "qty">, qty = 1) {
    const key = `${input.id}::${input.carat}`;
    const idx = items.findIndex((i) => i.key === key);
    if (idx >= 0) {
      const next = [...items];
      next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      items = next;
    } else {
      items = [...items, { ...input, key, qty }];
    }
    emit();
  },
  updateQty(key: string, qty: number) {
    if (qty <= 0) return cart.remove(key);
    items = items.map((i) => (i.key === key ? { ...i, qty } : i));
    emit();
  },
  remove(key: string) {
    items = items.filter((i) => i.key !== key);
    emit();
  },
  clear() {
    items = [];
    emit();
  },
};

const EMPTY: CartItem[] = [];

export function useCart(): CartItem[] {
  return useSyncExternalStore(
    cart.subscribe,
    cart.get,
    () => EMPTY,
  );
}

export function cartTotals(list: CartItem[]) {
  const count = list.reduce((s, i) => s + i.qty, 0);
  const subtotal = list.reduce((s, i) => s + i.priceNum * i.qty, 0);
  return { count, subtotal };
}

// Formats an INR base amount in the shopper's selected currency.
export function formatINR(n: number) {
  return formatMoney(n);
}
