import { useSyncExternalStore } from "react";

export type WishlistItem = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: string;
  priceNum: number;
  carat: string;
};

const STORAGE_KEY = "noor.wishlist.v1";

function load(): WishlistItem[] {
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

function save(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

let items: WishlistItem[] = load();
const listeners = new Set<() => void>();

function emit() {
  save(items);
  listeners.forEach((l) => l());
}

export const wishlist = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get(): WishlistItem[] {
    return items;
  },
  has(id: string) {
    return items.some((i) => i.id === id);
  },
  add(input: WishlistItem) {
    if (items.some((i) => i.id === input.id)) return;
    items = [...items, input];
    emit();
  },
  remove(id: string) {
    items = items.filter((i) => i.id !== id);
    emit();
  },
  toggle(input: WishlistItem) {
    if (items.some((i) => i.id === input.id)) {
      wishlist.remove(input.id);
    } else {
      wishlist.add(input);
    }
  },
  clear() {
    items = [];
    emit();
  },
};

const EMPTY: WishlistItem[] = [];

export function useWishlist(): WishlistItem[] {
  return useSyncExternalStore(wishlist.subscribe, wishlist.get, () => EMPTY);
}

export function useIsWishlisted(id: string): boolean {
  return useSyncExternalStore(
    wishlist.subscribe,
    () => wishlist.has(id),
    () => false,
  );
}
