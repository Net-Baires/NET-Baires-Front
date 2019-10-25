import { Config } from "./config";
import { getToken } from "./authService";

export const getRequest = <TResponse>(
  url: string,
  defaultValue: TResponse | null = null
) => {
  return fetch(`${Config.api.baseRemote}${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  }).then(response => {
    if (response.status === 204) return defaultValue;
    return response.json();
  });
};

export const postWithFileRequest = <TBody>(
  url: string,
  file: File,
  body: TBody
) => WithFileequest("POST", url, file, body);

export const putWithFileRequest = <TBody>(
  url: string,
  file: File,
  body: TBody
) => WithFileequest("PUT", url, file, body);

const WithFileequest = <TBody>(
  action: string,
  url: string,
  file: File,
  body: TBody
) => {
  var formData = new FormData();
  formData.append("ImageFile", file);
  Object.keys(body).forEach((key: string) =>
    formData.append(key, (body as any)[key])
  );
  const options: RequestInit = {
    method: action,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  };
  return fetch(`${Config.api.baseRemote}${url}`, options).then((x: any) => {
    var contentType = x.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return x.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
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
export const deleteRequest = (url: string): Promise<any> => {
  return fetch(`${Config.api.baseRemote}${url}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  }).then((x: any) => {
    var contentType = x.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return x.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
};
