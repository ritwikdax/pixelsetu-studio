"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { Album } from "../interfaces/entity";

export function useAlbums() {
  return useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      const response = await appApi.get("/studio/albums");
      return response.data?.data as Album[];
    },
  });
}
