import { getRequest } from "./requestServices";
import { Member } from "./models/Member";

export const getMembersInBadge = (id: number): Promise<Member[]> => {
  return getRequest(`/badges/${id}/members`);
};

export const getMemberByQuery = (query: string): Promise<Member[]> => {
  return getRequest(`/members/${query}`);
};
export const getMemberDetail = (id: number): Promise<Member> => {
  return getRequest(`/members/${id}`);
};