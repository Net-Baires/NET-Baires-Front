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
}

export interface UpdateEvent {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  done?: boolean;
  live?: boolean;
}
