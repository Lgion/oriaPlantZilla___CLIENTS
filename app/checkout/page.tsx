"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { PaymentCard } from '@/components/payment/PaymentCard';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalWithDiscount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="mb-6">
        <p className="text-lg mb-2">Order Total: ${totalWithDiscount().toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Please enter your payment details below</p>
      </div>
      <PaymentCard onSuccess={() => {
        // Handle successful payment
        useCartStore.getState().clearCart();
        router.push('/thank-you');
      }} />
    </div>
  );
}