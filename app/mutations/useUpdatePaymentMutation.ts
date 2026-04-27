"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Payment } from "../interfaces/entity";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";
import { useParams, useRouter } from "next/navigation";

type UpdatePaymentData = Pick<Payment, "amount" | "date" | "mode" | "notify">;

export function useUpdatePaymentMutation() {
  const toast = useToast();
  const router = useRouter();
  const { projectId, paymentId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePaymentData) => {
      const response = await appApi.patch(
        `/studio/payments/${paymentId}`,
        data,
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", projectId] });
      queryClient.invalidateQueries({
        queryKey: ["payments", projectId, paymentId],
      });
      toast.show("success", "Payment updated successfully!", {
        title: "Success",
      });
      router.push(`/projects/${projectId}`);
    },

    onError: (error) => {
      console.error("Failed to update payment:", error);
      toast.show("error", "Failed to update payment. Please try again.", {
        title: "Error",
      });
    },
  });
}
