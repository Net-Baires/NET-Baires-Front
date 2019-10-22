import { Config } from "./config";

export const inviteMeSlack = (email: string): Promise<string> => {
  return fetch(`${Config.api.baseRemote}/slack`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ Email: email })
  }).then((response: any) => {
    if (response.status !== 200) {
      return response.json().then((e: any) => Promise.reject(e));
    }
    return response.json();
  });
};
