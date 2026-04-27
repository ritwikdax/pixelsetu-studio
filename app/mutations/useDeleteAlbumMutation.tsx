"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";

export function useDeleteAlbumMutation() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await appApi.delete(`/studio/albums/${id}`);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      toast.show("success", "Album deleted successfully!", {
        title: "Success",
      });
    },

    onError: (error) => {
      console.error("Failed to delete album:", error);
      toast.show("error", "Failed to delete album. Please try again.", {
        title: "Error",
      });
    },
  });
}
