import {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest
} from "./requestServices";
import { Member } from "./models/Member";

export const getAllUsersToEdit = (): Promise<Member[]> =>
  getRequest(`/members`);

export const getUsersToEdit = (id: number): Promise<Member> =>
  getRequest(`/members/${id}`);

export const deleteEditUser = (id: number): Promise<boolean> =>
  deleteRequest(`/members/${id}`);

export const newUser = (member: Member): Promise<Member> =>
  postRequest(`/members`, member);

export const updateUser = (id: number, member: Member): Promise<Member> => {
  return putRequest(`/members/${id}`, member);
};

export const enableUser = (userId: number, enable: boolean): Promise<boolean> =>
  putRequest(`/members/${userId}/enabled/${enable}`);
