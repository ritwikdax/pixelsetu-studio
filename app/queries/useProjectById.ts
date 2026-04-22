"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { Project } from "../interfaces/entity";
import { useParams } from "next/navigation";

export function useProjectById() {
  const { projectId } = useParams();
  return useQuery({
    enabled: !!projectId,
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const response = await appApi.get(`/studio/projects/${projectId}`);
      return response.data?.data as Project;
    },
  });
}
