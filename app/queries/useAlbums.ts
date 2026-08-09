"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { listQueryOptions } from "@utils/query";
import { Album } from "../interfaces/entity";

export function useAlbums() {
  return useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      const response = await appApi.get("albums");
      return response.data?.data as Album[];
    },
    ...listQueryOptions,
  });
}
