"use client";

import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}