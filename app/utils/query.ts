import { keepPreviousData } from "@tanstack/react-query";

export const LIST_STALE_TIME = 5 * 60 * 1000;

export const listQueryOptions = {
  staleTime: LIST_STALE_TIME,
  placeholderData: keepPreviousData,
};
