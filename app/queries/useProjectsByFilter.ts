"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { appApi } from "@utils/http";
import { listQueryOptions } from "@utils/query";
import { useProjectFilter } from "../hooks/useProjectFilter";
import { ProjectsListResponse } from "../interfaces/api.type";
import {
  buildProjectsSearchParams,
  serializeProjectFilter,
} from "../utils/projectQuery";

export function useProjectsByFilter() {
  const [filter] = useProjectFilter();

  return useInfiniteQuery({
    queryKey: ["projects", serializeProjectFilter(filter)],
    queryFn: async ({ pageParam }) => {
      const searchParams = buildProjectsSearchParams(filter, pageParam);
      const response = await appApi.get<ProjectsListResponse>(
        `/projects?${searchParams}`,
      );
      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next,
    ...listQueryOptions,
  });
}
