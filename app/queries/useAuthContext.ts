import { useQuery } from "@tanstack/react-query";
import { OrgInfo, ProfileInfo, SuccessResponse } from "../interfaces/type";
import { authApi } from "../utils";

export function useAuthContextQuery({
  enabled = true,
}: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ["authContext"],
    enabled,
    queryFn: async () => {
      const [{ data: meData }, { data: orgData }] = await Promise.all([
        authApi.get<SuccessResponse<ProfileInfo>>("me"),
        authApi.get<SuccessResponse<OrgInfo>>("org"),
      ]);
      return {
        me: meData?.data,
        org: orgData?.data,
      } as any;
    },
    retry: false,
    retryOnMount: false, // Don't re-fetch /me when new components mount after an error
    staleTime: Infinity, // Auth never goes stale automatically
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
