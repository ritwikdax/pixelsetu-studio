"use client";
import {
  DialogProvider,
  PixelThemeProvider,
  ToastProvider,
} from "@ritwikdax/uicc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopNavBar from "../components/TopNav";
import SidePanelNavigation from "../components/SidePanelNavigation";
import { RxHamburgerMenu } from "react-icons/rx";
import AppLayout from "../components/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function AllContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <PixelThemeProvider>
        <ToastProvider>
          <DialogProvider>
            <AppLayout>{children}</AppLayout>
          </DialogProvider>
        </ToastProvider>
      </PixelThemeProvider>
    </QueryClientProvider>
  );
}
