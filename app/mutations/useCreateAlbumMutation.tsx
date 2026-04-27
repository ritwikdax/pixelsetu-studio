"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Album } from "../interfaces/entity";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";
import { useParams, useRouter } from "next/navigation";

type CreateAlbumData = Pick<
  Album,
  | "name"
  | "isSelectionAllowed"
  | "maxSelectionCount"
  | "projectName"
  | "projectId"
>;

export function useCreateAlbumMutation() {
  const toast = useToast();
  const router = useRouter();
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAlbumData) => {
      const response = await appApi.post(`/studio/albums`, data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums", projectId] });
      toast.show("success", "Album created successfully!", {
        title: "Success",
      });
      router.push(`/projects/${projectId}`);
    },

    onError: (error) => {
      console.error("Failed to create album:", error);
      toast.show("error", "Failed to create album. Please try again.", {
        title: "Error",
      });
    },
  });
}
