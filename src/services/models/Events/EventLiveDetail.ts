export interface EventLiveDetail {
  id: number;
  title: string;
  description: string;
  platform: string;
  imageUrl: string;
  generalAttendance: ReportGeneralAttendance;
  membersDetails: Members;
}
export interface ReportGeneralAttendance {
  tokenToReportGeneralAttendance: string;
}
export interface Members {
  totalMembersRegistered: number;
  totalMembersAttended: number;
  membersAttended: MemberDetail[];
}
export interface MemberDetail {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
}
