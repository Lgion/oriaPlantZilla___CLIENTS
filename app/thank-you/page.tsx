"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
      <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="text-muted-foreground mb-8">
        Your order has been successfully processed. You will receive a confirmation email shortly.
      </p>
      <Button onClick={() => router.push('/')}>
        Continue Shopping
      </Button>
    </div>
  );
}