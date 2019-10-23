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
  return fetch(`${Config.api.baseRemote}${url}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: body
  }).then((x: any) => {
    var contentType = x.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return x.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
};
export const postRequest = (url: string, body: string = ""): Promise<any> => {
  return fetch(`${Config.api.baseRemote}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: body
  }).then((x: any) => {
    var contentType = x.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return x.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
};
