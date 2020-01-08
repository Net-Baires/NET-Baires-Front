import { getRequest } from "./requestServices";
import { Member } from "./models/Member";

export const getOrganizers = (): Promise<Member[]> => {
  return getRequest(`/organizers`);
};

export const getOrganizer = (id: number): Promise<Member> => {
  return getRequest(`/members/${id}`);
};
