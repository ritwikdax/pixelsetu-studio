"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Project } from "../interfaces/entity";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";
import { useRouter } from "next/navigation";

export function useCreateProjectMutation() {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Project, "id">) => {
      // Replace with actual API call
      const response = await appApi.post("/studio/projects", data);
      return response.data;
    },

    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log("Project created successfully:", message);
      // Invalidate or refetch projects query here if needed
      toast.show("success", "Project created successfully!", {
        title: "Success",
      });
      router.push("/projects");
    },

    onError: (error) => {
      // Handle error here, e.g., show a toast notification
      console.error("Failed to create project:", error);
      toast.show("error", "Failed to create project. Please try again.", {
        title: "Error",
      });
    },
  });
}
