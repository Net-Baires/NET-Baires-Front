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
