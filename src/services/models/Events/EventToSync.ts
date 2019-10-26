export interface EventToSync {
  id: number;
  attended: number;
  registered: number;
  didNotAttend: number;
  title: string;
  description: string;
  imageUrl: string;
  platform: string;
  eventId: string;
  done: boolean;
  date: string;
  live: boolean;
}
