"use client";

import { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Menu, ShoppingCart } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart';

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.total());

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          <UserButton afterSignOutUrl="/" />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4">
                <Link href="/category/phytosanitary" onClick={() => setIsOpen(false)}>
                  Phytosanitary Products
                </Link>
                <Link href="/category/plants" onClick={() => setIsOpen(false)}>
                  Plants & Seeds
                </Link>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  Cart (${cartTotal.toFixed(2)})
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}