"use client";
import { Profiler, type ProfilerOnRenderCallback } from "react";
import {
  DialogProvider,
  PixelThemeProvider,
  ToastProvider,
} from "@ritwikdax/uicc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "../components/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
  },
});

const isDev = process.env.NODE_ENV === "development";

// Keep lightweight — console logging every commit freezes the UI with DevTools open.
const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
) => {
  if (actualDuration < 50) return;
  console.debug(
    `[Profiler:${id}] ${phase} took ${actualDuration.toFixed(1)}ms`,
  );
};

export default function AllContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = (
    <QueryClientProvider client={queryClient}>
      <PixelThemeProvider>
        <ToastProvider>
          <AppLayout>
            <DialogProvider>{children}</DialogProvider>
          </AppLayout>
        </ToastProvider>
      </PixelThemeProvider>
    </QueryClientProvider>
  );

  if (!isDev) {
    return tree;
  }

  return (
    <Profiler id="App" onRender={onRender}>
      {tree}
    </Profiler>
  );
}
