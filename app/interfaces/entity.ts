export interface Project {
  id: string;
  name: string;
  phone: string;
  displayName: string;
  bookingCategory:
    | "wedding"
    | "pre_wedding"
    | "post_wedding"
    | "anniversary"
    | "birthday"
    | "corporate_shoot"
    | "baby_bump"
    | "rice_ceremony"
    | "engagement"
    | "thread_ceremony"
    | "reception"
    | "newborn_shoot"
    | "baby_shower"
    | "aiburo_vaat"
    | "kids_shoot"
    | "funeral"
    | "saadh"
    | "other";
  dateOfBooking: Date;
  email: string;
  status: "open" | "close" | "reopen" | "withdrawn" | "on_hold" | "unknown";
  softcopyUrl?: string;
  quotationAmount?: number;
}

export interface Album {
  project: {
    id: string;
    name: string;
  };
  dateOfBooking: Date;
  projectId: string;
  albumName: string;
  isSelectionAllowed: boolean;
  maxSelectionCount: number;
  alreadySelectedCount?: number;
  isSelectionSubmitted?: boolean;
  selectionSubmittedAt?: string;
  isSelectionStarted?: boolean;
  selectionStartedAt?: string;
  comment?: string;
}
