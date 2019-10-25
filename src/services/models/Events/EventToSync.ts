export interface EventToSync {
  id: number;
  attendedCount: number;
  didNotAttendCount: number;
  title: string;
  description: string;
  imageUrl: string;
  platform: string;
  eventId: string;
  done: boolean;
  date: string;
  live: boolean;
}
