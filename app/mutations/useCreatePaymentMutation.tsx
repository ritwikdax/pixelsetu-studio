"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Payment } from "../interfaces/entity";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";
import { useParams, useRouter } from "next/navigation";

type CreatePaymentData = Pick<
  Payment,
  "amount" | "date" | "mode" | "projectId" | "projectName" | "notify"
>;

export function useCreatePaymentMutation() {
  const toast = useToast();
  const router = useRouter();
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePaymentData) => {
      const response = await appApi.post(`/studio/payments`, data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", projectId] });
      toast.show("success", "Payment recorded successfully!", {
        title: "Success",
      });
      router.push(`/projects/${projectId}`);
    },

    onError: (error) => {
      console.error("Failed to record payment:", error);
      toast.show("error", "Failed to record payment. Please try again.", {
        title: "Error",
      });
    },
  });
}
