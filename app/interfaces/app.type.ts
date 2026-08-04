export interface ProjectFilter {
  limit?: number;
  sort?: string;
  status?: string;
  searchTerm?: string;
  softcopyUrl?: boolean;
  filters?: string[];
  byMonth?: {
    month?: number;
    year?: number;
  };
}
