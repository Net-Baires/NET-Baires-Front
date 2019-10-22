import { Config } from "./config";
import { getToken } from "./authService";

export const getRequest = (url: string) => {
  return fetch(`${Config.api.baseRemote}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  }).then((x: any) => x.json());
};

export const putRequest = (url: string, body: string = ""): Promise<any> => {
  return fetch(`${Config.api.baseRemote}url`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: body
  }).then((x: any) => x.json());
};
