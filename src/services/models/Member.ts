export interface Member {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  blocked: boolean;
  organized: boolean;
  colaborator: boolean;
  linkedin: string;
  twitter: string;
  picture: string;
  github: string;
  instagram: string;
  biography: string;
  attended: boolean;
  speaker: boolean;
  organizer: boolean;
}

export interface BadgeDetail {
  id: number;
  badgeId: string;
  badgeUrl: string;
  badgeImageUrl: string;
  created: string;
  issuerUrl: string;
  image: string;
  name: string;
  description: string;
}
export interface BadgeAssign {
  id: number;
  badgeUrl: string;
  badgeImageUrl: string;
  assigned: boolean;
  created: string;
}
