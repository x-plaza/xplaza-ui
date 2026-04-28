import { create } from 'zustand';

type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review' | 'complete';

interface CheckoutStore {
  currentStep: CheckoutStep;
  checkoutId: string | null;
  setStep: (step: CheckoutStep) => void;
  setCheckoutId: (id: string) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  currentStep: 'shipping',
  checkoutId: null,
  setStep: (step) => set({ currentStep: step }),
  setCheckoutId: (id) => set({ checkoutId: id }),
  reset: () => set({ currentStep: 'shipping', checkoutId: null }),
}));
