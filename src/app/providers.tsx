"use client";

import type * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </QueryClientProvider>
  );
}
