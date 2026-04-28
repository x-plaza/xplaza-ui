'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useCheckoutStore } from '@/stores/checkout-store';
import {
  startCheckout,
  getCheckout,
  setShippingAddress,
  setShippingMethod,
  setPaymentMethod,
  completeCheckout,
  type CheckoutSession,
  type Address,
} from '@/lib/checkout-api';

export function useCheckout() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { checkoutId, setCheckoutId, setStep } = useCheckoutStore();

  const checkoutQuery = useQuery({
    queryKey: ['checkout', checkoutId],
    queryFn: () =>
      checkoutId
        ? getCheckout(Number(checkoutId)).then((r) => r.data ?? null)
        : null,
    enabled: checkoutId !== null,
    staleTime: 30_000,
  });

  const checkout = checkoutQuery.data ?? null;

  const startMutation = useMutation({
    mutationFn: ({ cartId }: { cartId: number }) => {
      if (!user) throw new Error('Must be logged in to checkout');
      return startCheckout(cartId, user.id);
    },
    onSuccess: (data) => {
      if (data.data?.id) {
        setCheckoutId(String(data.data.id));
        queryClient.setQueryData(['checkout', String(data.data.id)], data.data);
      }
    },
  });

  const shippingAddressMutation = useMutation({
    mutationFn: (address: Address) => {
      if (!checkoutId) throw new Error('No checkout session');
      return setShippingAddress(Number(checkoutId), address);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['checkout', checkoutId], data.data);
      }
    },
  });

  const shippingMethodMutation = useMutation({
    mutationFn: (methodId: number) => {
      if (!checkoutId) throw new Error('No checkout session');
      return setShippingMethod(Number(checkoutId), methodId);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['checkout', checkoutId], data.data);
      }
    },
  });

  const paymentMethodMutation = useMutation({
    mutationFn: (method: string) => {
      if (!checkoutId) throw new Error('No checkout session');
      return setPaymentMethod(Number(checkoutId), method);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['checkout', checkoutId], data.data);
      }
    },
  });

  const completeMutation = useMutation({
    mutationFn: (idempotencyKey: string) => {
      if (!checkoutId) throw new Error('No checkout session');
      return completeCheckout(Number(checkoutId), idempotencyKey);
    },
    onSuccess: () => {
      setStep('complete');
    },
  });

  return {
    checkout,
    checkoutId,
    loading: checkoutQuery.isLoading,
    start: startMutation.mutateAsync,
    isStarting: startMutation.isPending,
    setShippingAddress: shippingAddressMutation.mutateAsync,
    isSavingAddress: shippingAddressMutation.isPending,
    setShippingMethod: shippingMethodMutation.mutateAsync,
    isSavingMethod: shippingMethodMutation.isPending,
    setPaymentMethod: paymentMethodMutation.mutateAsync,
    isSavingPayment: paymentMethodMutation.isPending,
    complete: completeMutation.mutateAsync,
    isCompleting: completeMutation.isPending,
  };
}
