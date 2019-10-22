import { Config } from "./config";
import { getToken, getCurrentUser } from "./authService";
import { getRequest } from "./requestServices";
import { User } from "./models/User";

export const getUserProfile = (id: number = 10): Promise<User> => {
  return getRequest(`/members/${getCurrentUser().id}`);
};

export const getAllUsersToEdit = (): Promise<User[]> => {
  return fetch(`${Config.api.baseRemote}/members`).then(x => x.json());
};

export const getUsersToEdit = (id: number): Promise<User> => {
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

export const newUser = (user: User): Promise<User> => {
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
export const updateUser = (id: number, user: User): Promise<User> => {
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
