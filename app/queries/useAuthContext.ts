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
      const { data: meData } =
        await authApi.get<SuccessResponse<ProfileInfo>>("api//me");
      //return meData?.data; // Assuming the user info is in data.data
      const { data: orgData } =
        await authApi.get<SuccessResponse<OrgInfo>>("api/org");
      return {
        me: meData?.data,
        org: orgData?.data,
      } as any;
    },
    retry: false,
    staleTime: Infinity, // Auth never goes stale automatically
    refetchOnMount: false, // Don't re-call the API when a new subscriber mounts
  });
}
