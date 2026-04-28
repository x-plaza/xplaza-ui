'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import {
  getCart,
  getOrCreateCart,
  getOrCreateGuestCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon,
  saveForLater,
  moveToCart,
  type Cart,
} from '@/lib/cart-api';
import { useEffect, useState } from 'react';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('xp-session-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('xp-session-id', id);
  }
  return id;
}

export function useCart() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState<number | null>(null);

  // Initialize cart
  useEffect(() => {
    async function initCart() {
      try {
        let response;
        if (user) {
          response = await getOrCreateCart(user.id);
        } else {
          const sessionId = getSessionId();
          if (!sessionId) return;
          response = await getOrCreateGuestCart(sessionId);
        }
        if (response.data?.id) {
          setCartId(response.data.id);
        }
      } catch {
        // Cart init failed, will retry on next interaction
      }
    }
    initCart();
  }, [user]);

  const cartQuery = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => (cartId ? getCart(cartId).then((r) => r.data ?? null) : null),
    enabled: cartId !== null,
    staleTime: 0,
  });

  const cart = cartQuery.data ?? null;

  const addItemMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
      variantId,
    }: {
      productId: number;
      quantity: number;
      variantId?: number;
    }) => {
      if (!cartId) throw new Error('No cart');
      return addToCart(cartId, productId, quantity, variantId);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['cart', cartId], data.data);
      }
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      if (!cartId) throw new Error('No cart');
      return updateCartItem(cartId, itemId, quantity);
    },
    onMutate: async ({ itemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart', cartId] });
      const previous = queryClient.getQueryData<Cart>(['cart', cartId]);
      if (previous) {
        const updated = {
          ...previous,
          items: previous.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
              : item
          ),
        };
        queryClient.setQueryData(['cart', cartId], updated);
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['cart', cartId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: number) => {
      if (!cartId) throw new Error('No cart');
      return removeCartItem(cartId, itemId);
    },
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ['cart', cartId] });
      const previous = queryClient.getQueryData<Cart>(['cart', cartId]);
      if (previous) {
        const updated = {
          ...previous,
          items: previous.items.filter((item) => item.id !== itemId),
        };
        queryClient.setQueryData(['cart', cartId], updated);
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['cart', cartId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });

  const applyCouponMutation = useMutation({
    mutationFn: (couponCode: string) => {
      if (!cartId) throw new Error('No cart');
      return applyCoupon(cartId, couponCode);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['cart', cartId], data.data);
      }
    },
  });

  const removeCouponMutation = useMutation({
    mutationFn: () => {
      if (!cartId) throw new Error('No cart');
      return removeCoupon(cartId);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['cart', cartId], data.data);
      }
    },
  });

  const saveForLaterMutation = useMutation({
    mutationFn: (itemId: number) => {
      if (!cartId) throw new Error('No cart');
      return saveForLater(cartId, itemId);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['cart', cartId], data.data);
      }
    },
  });

  const moveToCartMutation = useMutation({
    mutationFn: (itemId: number) => {
      if (!cartId) throw new Error('No cart');
      return moveToCart(cartId, itemId);
    },
    onSuccess: (data) => {
      if (data.data) {
        queryClient.setQueryData(['cart', cartId], data.data);
      }
    },
  });

  return {
    cart,
    cartId,
    loading: cartQuery.isLoading,
    itemCount: cart?.itemCount ?? 0,
    addItem: addItemMutation.mutateAsync,
    updateItem: updateItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    applyCoupon: applyCouponMutation.mutateAsync,
    removeCoupon: removeCouponMutation.mutate,
    saveForLater: saveForLaterMutation.mutate,
    moveToCart: moveToCartMutation.mutate,
    isAdding: addItemMutation.isPending,
  };
}
