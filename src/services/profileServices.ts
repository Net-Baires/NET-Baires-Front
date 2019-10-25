import { getRequest, putWithFileRequest } from "./requestServices";
import { Member } from "./models/Member";

export const getMe = (): Promise<Member> => {
  return getRequest(`/me`);
};

export const updateMe = (me: Member, picture: File): Promise<Member> => {
  return putWithFileRequest(`/me`, picture, me);
};
