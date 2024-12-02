"use client";

import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface PaymentCardProps {
  onSuccess: () => void;
}

export function PaymentCard({ onSuccess }: PaymentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let card: any;
    const initCard = async () => {
      const { Card3D } = await import('react-3d-card-payment');
      if (cardRef.current) {
        card = new Card3D({
          element: cardRef.current,
          width: 350,
          height: 200,
        });
      }
    };

    initCard();

    return () => {
      if (card) {
        card.destroy();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const cardNumber = formData.get('cardNumber');
    const expiryDate = formData.get('expiryDate');
    const cvv = formData.get('cvv');

    if (!cardNumber || !expiryDate || !cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    // Simulate payment processing
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing payment...',
        success: () => {
          onSuccess();
          return 'Payment successful!';
        },
        error: 'Payment failed. Please try again.',
      }
    );
  };

  return (
    <Card className="p-6">
      <div ref={cardRef} className="mb-6 w-full h-[200px] bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl" />
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            pattern="\d*"
            onChange={(e) => {
              let value = e.target.value.replace(/\s/g, '');
              if (value.length > 16) return;
              value = value.match(/.{1,4}/g)?.join(' ') || value;
              e.target.value = value;
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              maxLength={5}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 4) return;
                if (value.length > 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2);
                }
                e.target.value = value;
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              type="password"
              maxLength={3}
              placeholder="123"
              pattern="\d*"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Pay Now
        </Button>
      </form>
    </Card>
  );
}