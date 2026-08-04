import { useQuery } from "@tanstack/react-query";
import { OrgMember, SuccessResponse } from "../interfaces/type";
import { authApi } from "../utils";

export function useOrgMembersQuery({
  enabled = true,
}: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: ["orgMembers"],
    queryFn: async () => {
      const { data } = await authApi.get<SuccessResponse<OrgMember[]>>(
        "identity/org/members",
      );
      return data.data;
    },
    enabled,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
