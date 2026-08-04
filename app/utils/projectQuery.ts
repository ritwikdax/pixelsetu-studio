import { ProjectFilter } from "../interfaces/app.type";

export function serializeProjectFilter(filter: ProjectFilter): string {
  return JSON.stringify(filter);
}

const DEFAULT_LIMIT = 20;
const DEFAULT_SORT = "-createdAt";

export function buildFilterParams(filter: ProjectFilter): string[] {
  const filters: string[] = [...(filter.filters ?? [])];

  if (filter.status) {
    filters.push(`status:eq:${filter.status}`);
  }

  if (filter.softcopyUrl === false) {
    filters.push("softcopyUrl:eq:");
  }

  if (filter.byMonth?.month && filter.byMonth?.year) {
    const { month, year } = filter.byMonth;
    const start = new Date(year, month - 1, 1).toISOString();
    const end = new Date(year, month, 1).toISOString();
    filters.push(`dateOfBooking:gte:${start}`);
    filters.push(`dateOfBooking:lt:${end}`);
  }

  return filters;
}

export function buildProjectsSearchParams(
  filter: ProjectFilter,
  next?: string,
): string {
  const parts: string[] = [
    `limit=${filter.limit ?? DEFAULT_LIMIT}`,
    `sort=${filter.sort ?? DEFAULT_SORT}`,
  ];

  if (filter.searchTerm) {
    parts.push(`search=${filter.searchTerm}`);
  }

  const filters = buildFilterParams(filter);
  if (filters.length > 0) {
    parts.push(`filter=${filters.join(",")}`);
  }

  if (next) {
    parts.push(`next=${next}`);
  }

  return parts.join("&");
}
