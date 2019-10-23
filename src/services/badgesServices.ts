import { getRequest, postRequest } from "./requestServices";
import { BadgeDetail, BadgeAssign } from "./models/Member";

export const syncBadges = (): Promise<boolean> => {
  return getRequest("/badges/sync");
};

export const getBadge = (id: number): Promise<BadgeDetail> => {
  return getRequest(`/badges/${id}`);
};

export const getBadges = (): Promise<BadgeDetail[]> => {
  return getRequest(`/badges`);
};

export const getBadgesToAssign = (memberId: number): Promise<BadgeAssign[]> => {
  return getRequest(`/badges/toAssign?memberId=${memberId}`);
};
export const assignBadgeToMember = (
  badgeId: number,
  memberId: number
): Promise<BadgeAssign[]> => {
  return postRequest(`/badges/${badgeId}/Member/${memberId}`);
};
