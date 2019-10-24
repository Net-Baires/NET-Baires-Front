import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
  PostWithFileRequest
} from "./requestServices";
import { BadgeAssign } from "./models/BadgeAssign";
import { BadgeDetail } from "./models/BadgeDetail";

export const syncBadges = (): Promise<boolean> => {
  return getRequest("/badges/sync");
};

export const getBadge = (id: number): Promise<BadgeDetail> => {
  return getRequest(`/badges/${id}`);
};

export const getBadgeToEdit = (id: number): Promise<BadgeDetail> => {
  return getRequest(`/badges/${id}`);
};
export const deleteBadge = (id: number): Promise<BadgeDetail> => {
  return deleteRequest(`/badges/${id}`);
};

export const newBadge = (
  badge: BadgeDetail,
  formData: FormData
): Promise<BadgeDetail> => {
  return PostWithFileRequest(`/badges/`, formData);
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
export const updateBadge = (
  badgeId: number,
  badge: BadgeDetail
): Promise<BadgeAssign[]> => {
  return putRequest(`/badges/${badgeId}`, JSON.stringify(badge));
};
export const removeBadgeFromMember = (
  badgeId: number,
  memberId: number
): Promise<BadgeAssign[]> => {
  return deleteRequest(`/badges/${badgeId}/Member/${memberId}`);
};
