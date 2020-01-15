import { getRequest, putRequest } from './requestServices';
import { Member } from "./models/Member";
import { GetBadgeResponse, BadgeMemberViewModel } from './models/BadgeDetail';

export const getMembersInBadge = (id: number): Promise<Member[]> => {
  return getRequest(`/badges/${id}/members`);
};
export const getBadgesFromMeber = (memberId: number): Promise<BadgeMemberViewModel[]> => {
  return getRequest(`/members/${memberId}/badges`);
};

export const getBadgeFromMeber = (memberId: number, badgeId: number): Promise<BadgeMemberViewModel> => {
  return getRequest(`/members/${memberId}/badges/${badgeId}`);
};

export const getMemberByQuery = (query: string): Promise<Member[]> => {
  return getRequest(`/members/${query}`);
};
export const getMemberDetail = (id: number): Promise<Member> => {
  return getRequest(`/members/${id}`);
};

export const updateInformation = (information: UpdateInformation): Promise<GetBadgeResponse[]> => {
  return putRequest(`/members/information`, information);
};
export interface UpdateInformation {
  pushNotificationId?: string;
}
