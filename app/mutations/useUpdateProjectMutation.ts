"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "../interfaces/entity";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";
import { useParams, useRouter } from "next/navigation";

export function useUpdateProjectMutation() {
  const toast = useToast();
  const router = useRouter();
  const { projectId } = useParams();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Project, "id">) => {
      // Replace with actual API call
      const response = await appApi.patch(
        `/studio/projects/${projectId}`,
        data,
      );
      return response.data;
    },

    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log("Project updated successfully:", message);
      // Invalidate or refetch projects query here if needed
      toast.show("success", "Project updated successfully!", {
        title: "Success",
      });
      router.push("/projects");
    },

    onError: (error) => {
      // Handle error here, e.g., show a toast notification
      console.error("Failed to update project:", error);
      toast.show("error", "Failed to update project. Please try again.", {
        title: "Error",
      });
    },
  });
}
