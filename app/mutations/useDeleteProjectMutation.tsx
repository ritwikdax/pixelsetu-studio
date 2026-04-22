"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";

export function useDeleteProjectMutation() {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // Replace with actual API call
      const response = await appApi.delete(`/studio/projects/${id}`);
      return response.data;
    },

    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log("Project deleted successfully:", message);
      // Invalidate or refetch projects query here if needed
      toast.show("success", "Project deleted successfully!", {
        title: "Success",
      });
    },

    onError: (error) => {
      // Handle error here, e.g., show a toast notification
      console.error("Failed to delete project:", error);
      toast.show("error", "Failed to delete project. Please try again.", {
        title: "Error",
      });
    },
  });
}
