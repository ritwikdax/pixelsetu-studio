//=====CORE =================
export interface ErrorResponse {
  message: string;
  error: boolean;
}

export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface EffectiveOrg {
  id: string;
  displayName: string;
  role: OrgRole;
}

export interface ProfileInfo {
  firstName: string;
  lastName: string;
  id: string;
  isVerified: boolean;
  email: string;
  avatarUrl: string;
  effectiveOrgs: Array<EffectiveOrg>;
  activeOrgId: string;
  activeRole: OrgRole;
  applicationPool: Array<string>;
}

export interface OrgInfo {
  id: string;
  displayName: string;
  namespace: string;
  lightLogoUrl: string;
  darkLogoUrl: string;
  tagline: string;
  phone: string;
  alternativePhone?: string;
  businessEmail: string;
  website: string;
  address: string;
  country?: string;
  state?: string;
  postalCode?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  googleMapUrl?: string;
  isVerified?: boolean;

  coverImageUrl?: string;
  featuredImages?: Array<{ id: string; value: string }>;
  platform?: "computer" | "photography" | "other";
}

export type OrgRole = "owner" | "admin" | "editor" | "viewer";
