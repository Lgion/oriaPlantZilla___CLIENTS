"use client";

import { useCartStore } from '@/store/cart';
import { CartList } from '@/components/cart/CartList';
import { CartSummary } from '@/components/cart/CartSummary';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some products to your cart to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartList />
      </div>
      <div>
        <CartSummary />
      </div>
    </div>
  );
}