export interface ProjectFilter {
  limit?: number;
  status?: string;
  bookingCategory?: string;
  searchTerm?: string;
  softcopyUrl?: string;
  byMonth?: {
    month?: number;
    year?: number;
  };
  startDate?: Date;
  endDate?: Date;
}
