import { create } from 'zustand';

interface UIStore {
  mobileMenuOpen: boolean;
  compareList: number[];
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  addToCompare: (productId: number) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  mobileMenuOpen: false,
  compareList: [],
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  addToCompare: (productId) =>
    set((s) => ({
      compareList: s.compareList.includes(productId)
        ? s.compareList
        : [...s.compareList, productId].slice(0, 4), // max 4 items
    })),
  removeFromCompare: (productId) =>
    set((s) => ({
      compareList: s.compareList.filter((id) => id !== productId),
    })),
  clearCompare: () => set({ compareList: [] }),
}));
