import { getRequest } from "./requestServices";
import { Member } from "./models/Member";

export const getMembersInBadge = (id: number): Promise<Member[]> => {
  return getRequest(`/badges/${id}/members`);
};
