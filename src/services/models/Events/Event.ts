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
  attended: number;
  registered: number;
  didNotAttend: number;
  eventId: string;
}
export interface SponsorEvent {
  sponsorId: number;
  detail: string;
}

export interface UpdateEvent {
  title?: string;
  description?: string;
  generalAttended?: boolean;
  imageUrl?: string;
  url?: string;
  done?: boolean;
  live?: boolean;
}
