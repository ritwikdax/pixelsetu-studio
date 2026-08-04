import { Project } from "./entity";

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  next?: string;
}

export type ProjectsListResponse = PaginatedResponse<Project>;
