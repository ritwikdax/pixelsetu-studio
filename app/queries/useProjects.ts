"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi, authApi } from "@utils/http";
import { Project } from "../interfaces/entity";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await appApi.get("/studio/projects");
      return response.data?.data as Project[];
    },
  });
}
