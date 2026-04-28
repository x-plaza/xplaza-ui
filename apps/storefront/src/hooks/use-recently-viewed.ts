'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'xp-recently-viewed';
const MAX_ITEMS = 20;

export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setIds(JSON.parse(stored));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  function addProduct(productId: string) {
    setIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    setIds([]);
  }

  return { recentlyViewedIds: ids, addProduct, clearAll };
}
