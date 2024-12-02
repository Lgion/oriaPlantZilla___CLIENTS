"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/ui/toast-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ToastProvider />
      {children}
    </ClerkProvider>
  );
}