"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { listQueryOptions } from "@utils/query";
import { Album } from "../interfaces/entity";
import { useParams } from "next/navigation";

export function useAlbumsByProjectId() {
  const { projectId } = useParams();
  return useQuery({
    enabled: !!projectId,
    queryKey: ["albums", projectId],
    queryFn: async () => {
      const response = await appApi.get(`albums/projects/${projectId}`);
      return response.data?.data as Album[];
    },
    ...listQueryOptions,
  });
}
