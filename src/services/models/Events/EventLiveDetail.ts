export interface EventLiveDetail {
  id: number;
  title: string;
  description: string;
  platform: string;
  startLiveTime: any;
  hasGroupCodeOpen?: boolean;
  imageUrl: string;
  generalAttended: boolean;
  generalAttendance: ReportGeneralAttendance;
  membersDetails: Members;
  attended?: boolean;
  tokenToReportMyAttendance: string;
  groupCodes: GroupCodeResponse[];
}
export interface ReportGeneralAttendance {
  tokenToReportGeneralAttendance: string;
  generalAttendedCode: string;
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
  attendedTime: string;
}

export interface GroupCodeResponse {
  id: number;
  code: string;
  detail: string;
  open: boolean;
  membersCount: number;
}