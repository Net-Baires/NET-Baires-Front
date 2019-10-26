export interface EventDetail {
  id: number;
  title: string;
  address: string;
  description: string;
  date: string;
  imageUrl: string;
  url: string;
  done: boolean;
  live: boolean;
  platform: string;
  sponsors: SponsorEvent[];
}
export interface SponsorEvent {
  sponsorId: number;
  detail: string;
}

export interface UpdateEvent {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  done?: boolean;
  live?: boolean;
}
