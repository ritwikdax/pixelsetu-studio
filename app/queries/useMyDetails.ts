import { useQuery } from "@tanstack/react-query";
import { authApi } from "@utils/http";

export function useMyDetails() {
  return useQuery({
    queryKey: ["myDetails"],
    queryFn: async () => {
      const response = await authApi.get("/api/me");
      return response.data;
    },
  });
}
