"use client";
import { useQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { Project } from "../interfaces/entity";
import { useParams } from "next/navigation";
import { useProjectFilter } from "../hooks/useProjectFilter";

export function useProjectsByFilter() {
  const [filter] = useProjectFilter();
  return useQuery({
    enabled: !!filter,
    queryKey: ["projects", JSON.stringify(filter)],
    queryFn: async () => {
      const response = await appApi.post("/studio/projects/filter", filter);
      return response.data?.data as Project[];
    },
  });
}
