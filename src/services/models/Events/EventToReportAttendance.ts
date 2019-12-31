export interface EventToReportAttendanceDetail {
  id: number;
  title: string;
  description: string;
  platform: string;
  url: string;
  eventId: string;
  done: boolean;
  live: boolean;
  imageUrl: string;
  date: Date;
  isUserRegistered: boolean;
  generalAttended: boolean;
  attended: number;
  didNotAttend: number;
  registered: number;
  sponsors: any[];
}
export interface EventToReportAttendance {
  eventDetail: EventToReportAttendanceDetail;
  token: string;
}
