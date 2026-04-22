import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToast } from "@ritwikdax/uicc";
import { ErrorResponse } from "../interfaces/type";
import { authApi } from "@utils/http";

export function useSwitchActiveOrgMutation() {
  const toast = useToast();
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (orgId: string) => {
      const { data } = await authApi.patch("api/me/switch-org-context", {
        orgId,
      });
      return data;
    },
    onSuccess: () => {
      toast.show("success", `Organization switched successfully!`, {
        title: "Success",
      });
      //client.invalidateQueries({ queryKey: ["authContext"] });
      client.resetQueries();
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      toast.show(
        "error",
        err.response?.data?.message || "Failed to switch organization",
        { title: "Error" },
      );
    },
  });
}
