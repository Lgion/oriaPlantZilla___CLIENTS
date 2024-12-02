"use client";

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CartList() {
  const { items, updateQuantity, removeItem } = useCartStore();

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex gap-4">
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="ml-auto"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}