"use client";

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success('Added to Cart', {
      description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of ${product.name} added to your cart`,
      icon: <ShoppingCart className="h-5 w-5" />,
      className: 'bg-primary text-primary-foreground',
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="relative aspect-square overflow-hidden group">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
        />
      </Card>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20"
            />
            <Button 
              onClick={handleAddToCart} 
              size="lg"
              className="transition-transform active:scale-95"
            >
              Add to Cart
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {product.stock} units available
          </p>
        </div>
      </div>
    </div>
  );
}