import { getRequest } from "./requestServices";
import { BadgeDetail } from "./models/Member";

export const syncBadges = (): Promise<boolean> => {
  return getRequest("/badges/sync");
};

export const getBadge = (id: number): Promise<BadgeDetail> => {
  return getRequest(`/badges/${id}`);
};

export const getBadges = (): Promise<BadgeDetail[]> => {
  return getRequest(`/badges`);
};
