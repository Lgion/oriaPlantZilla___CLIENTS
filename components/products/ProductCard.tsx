"use client";

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to Cart', {
      description: `${product.name} has been added to your cart`,
      icon: <ShoppingCart className="h-5 w-5" />,
      className: 'bg-primary text-primary-foreground',
    });
  };

  return (
    <Card className="h-full flex flex-col group">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
          />
        </div>
        <CardTitle className="p-4">
          <Link href={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        <Button 
          onClick={handleAddToCart}
          className="transition-transform active:scale-95"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}