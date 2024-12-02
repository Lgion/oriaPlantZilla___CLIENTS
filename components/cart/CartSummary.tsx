"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CartSummary() {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const { total, totalWithDiscount, applyPromoCode, promoDiscount } = useCartStore();

  const handleApplyPromo = () => {
    applyPromoCode(promoCode);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${total().toFixed(2)}</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex gap-2">
            <Input
              id="promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter code"
            />
            <Button onClick={handleApplyPromo}>Apply</Button>
          </div>
        </div>

        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${(total() - totalWithDiscount()).toFixed(2)}</span>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalWithDiscount().toFixed(2)}</span>
          </div>
        </div>

        <Button 
          className="w-full" 
          size="lg"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
}