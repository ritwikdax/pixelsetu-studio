import { useGlobalState } from "one-global-state";
import { ProjectFilter } from "../interfaces/app.type";

export function getDefaultProjectFilter(): ProjectFilter {
  const now = new Date();
  return {
    byMonth: {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  };
}

export function useProjectFilter() {
  return useGlobalState("projectFilter", getDefaultProjectFilter());
}
