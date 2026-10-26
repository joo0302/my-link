export type IconType =
  | "Portfolio"
  | "Github"
  | "Blog"
  | "Resume"
  | "Mail"
  | "Globe"
  | "Linkedin"
  | "Twitter"
  | "Youtube"
  | "Figma";

export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: IconType | string;
  tag?: string;
  category?: "featured" | "project" | "career" | "content" | "contact";
  highlight?: boolean;
  isExternal?: boolean;
  isActive?: boolean;
  clicks?: number;
  order?: number;
  createdAt?: string;
}

export interface UserProfile {
  name: string;
  jobTitle: string;
  initials: string;
  avatarUrl: string;
  badge: string;
  bio: string;
  email: string;
}

export interface SocialLink {
  platform: "github" | "blog" | "mail" | "linkedin" | "twitter" | "instagram";
  url: string;
}

export interface MyLinkData {
  profile: UserProfile;
  socials: SocialLink[];
  links: LinkItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    total: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
    timestamp: string;
  };
}
