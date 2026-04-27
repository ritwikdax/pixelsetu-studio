"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Album } from "../interfaces/entity";
import { appApi } from "../utils";
import { useToast } from "@ritwikdax/uicc";
import { useParams, useRouter } from "next/navigation";

type UpdateAlbumData = Pick<
  Album,
  "name" | "isSelectionAllowed" | "maxSelectionCount"
>;

export function useUpdateAlbumMutation() {
  const toast = useToast();
  const router = useRouter();
  const { projectId, albumId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateAlbumData) => {
      const response = await appApi.patch(`/studio/albums/${albumId}`, data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums", projectId] });
      queryClient.invalidateQueries({
        queryKey: ["albums", projectId, albumId],
      });
      toast.show("success", "Album updated successfully!", {
        title: "Success",
      });
      router.push(`/projects/${projectId}`);
    },

    onError: (error) => {
      console.error("Failed to update album:", error);
      toast.show("error", "Failed to update album. Please try again.", {
        title: "Error",
      });
    },
  });
}
