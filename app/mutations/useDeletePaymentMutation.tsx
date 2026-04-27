"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";

export function useDeletePaymentMutation() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await appApi.delete(`/studio/payments/${id}`);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.show("success", "Payment deleted successfully!", {
        title: "Success",
      });
    },

    onError: (error) => {
      console.error("Failed to delete payment:", error);
      toast.show("error", "Failed to delete payment. Please try again.", {
        title: "Error",
      });
    },
  });
}
