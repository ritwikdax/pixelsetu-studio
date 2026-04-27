"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { Payment } from "../interfaces/entity";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await appApi.get("/studio/payments");
      return response.data?.data as Payment[];
    },
  });
}
