import { Config } from "./config";
import { getToken, getCurrentUser } from "./authService";
import { getRequest } from "./requestServices";
import { Member } from "./models/Member";

export const getUserProfile = (id: number = 10): Promise<Member> => {
  return getRequest(`/members/${getCurrentUser().id}`);
};

export const getAllUsersToEdit = (): Promise<Member[]> => {
  return fetch(`${Config.api.baseRemote}/members`).then(x => x.json());
};

export const getUsersToEdit = (id: number): Promise<Member> => {
  return fetch(`${Config.api.baseRemote}/members/${id}`).then(x => x.json());
};

export const deleteEditUser = (id: number): Promise<boolean> => {
  return fetch(`${Config.api.baseRemote}/members/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: ""
  }).then((x: any) => x.json());
};

export const newUser = (user: Member): Promise<Member> => {
  return fetch(`${Config.api.baseRemote}/members`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(user)
  }).then((x: any) => x.json());
};
export const updateUser = (id: number, user: Member): Promise<Member> => {
  return fetch(`${Config.api.baseRemote}/members/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(user)
  }).then((x: any) => x.json());
};

export const enableUser = (
  userId: number,
  enable: boolean
): Promise<boolean> => {
  return fetch(`${Config.api.baseRemote}/members/${userId}/enabled/${enable}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: ""
  }).then((x: any) => x.json());
};
