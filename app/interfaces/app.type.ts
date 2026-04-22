export interface ProjectFilter {
  limit?: number;
  status?: string;
  searchTerm?: string;
  softcopyUrl?: boolean;
  byMonth?: {
    month?: number;
    year?: number;
  };
}
