import { useQuery } from "@tanstack/react-query";
import { authApi } from "@utils/http";

export function useMyDetails() {
  return useQuery({
    queryKey: ["myDetails"],
    queryFn: async () => {
      const response = await authApi.get("/me");
      return response.data;
    },
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
