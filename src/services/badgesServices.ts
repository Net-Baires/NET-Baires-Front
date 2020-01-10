import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
  postWithFileRequest,
  putWithFileRequest
} from "./requestServices";
import { BadgeAssign } from "./models/BadgeAssign";
import { GetBadgeResponse } from "./models/BadgeDetail";

export const syncBadges = (): Promise<boolean> => {
  return getRequest("/badges/sync");
};

export const getBadge = (id: number): Promise<GetBadgeResponse> => {
  return getRequest(`/badges/${id}`);
};

export const getBadgeByName = (name: string): Promise<GetBadgeResponse[]> => {
  return getRequest(`/badges?name=${name}`);
};

export const getBadgeToEdit = (id: number): Promise<GetBadgeResponse> => {
  return getRequest(`/badges/${id}`);
};
export const deleteBadge = (id: number): Promise<GetBadgeResponse> => {
  return deleteRequest(`/badges/${id}`);
};

export const newBadge = (
  badge: GetBadgeResponse,
  formData: File
): Promise<GetBadgeResponse> => {
  return postWithFileRequest(`/badges/`, formData, badge);
};

export const getBadges = (): Promise<GetBadgeResponse[]> => {
  return getRequest(`/badges`, new Array<GetBadgeResponse>());
};

export const getBadgesToAssign = (memberId: number): Promise<BadgeAssign[]> => {
  return getRequest(`/badges/toAssign?memberId=${memberId}`);
};
export const assignBadgeToMember = (
  badgeId: number,
  memberId: number
): Promise<BadgeAssign[]> => {
  return postRequest(`/badges/${badgeId}/members/${memberId}`);
};
export const updateBadge = (
  badgeId: number,
  badge: GetBadgeResponse,
  formData: File
): Promise<BadgeAssign[]> => {
  return putWithFileRequest(`/badges/${badgeId}`, formData, badge);
};
export const removeBadgeFromMember = (
  badgeId: number,
  memberId: number
): Promise<BadgeAssign[]> => {
  return deleteRequest(`/badges/${badgeId}/app/${memberId}`);
};
