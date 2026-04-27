"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { Payment } from "../interfaces/entity";
import { useParams } from "next/navigation";

export function usePaymentById() {
  const { projectId, paymentId } = useParams();
  return useQuery({
    enabled: !!projectId && !!paymentId,
    queryKey: ["payments", projectId, paymentId],
    queryFn: async () => {
      const response = await appApi.get(`/studio/payments/${paymentId}`);
      return response.data?.data as Payment;
    },
  });
}
