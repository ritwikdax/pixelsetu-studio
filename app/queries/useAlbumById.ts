"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { Album } from "../interfaces/entity";
import { useParams } from "next/navigation";

export function useAlbumById() {
  const { projectId, albumId } = useParams();
  return useQuery({
    enabled: !!projectId && !!albumId,
    queryKey: ["albums", projectId, albumId],
    queryFn: async () => {
      const response = await appApi.get(`/studio/albums/${albumId}`);
      return response.data?.data as Album;
    },
  });
}
