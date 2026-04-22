import { useGlobalState } from "one-global-state";

export function useProjectFilter() {
  return useGlobalState("projectFilter", {});
}
