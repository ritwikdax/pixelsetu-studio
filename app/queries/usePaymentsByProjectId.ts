"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { listQueryOptions } from "@utils/query";
import { Payment } from "../interfaces/entity";
import { useParams } from "next/navigation";

export function usePaymentsByProjectId() {
  const { projectId } = useParams();
  return useQuery({
    enabled: !!projectId,
    queryKey: ["payments", projectId],
    queryFn: async () => {
      const response = await appApi.get(
        `/payments/projects/${projectId}`,
      );
      return response.data?.data as Payment[];
    },
    ...listQueryOptions,
  });
}
