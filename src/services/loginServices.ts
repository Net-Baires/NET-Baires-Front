import { Member } from "./models/Member";
import { Config } from "./config";

export const login = (email: string, password: string): Member => {
  return {} as Member;
};

export const loginWithMeetupToken = (token: string): Promise<string> => {
  return loginSocialMedia("/Auth/Meetup", token);
};

export const loginWithEventBriteToken = (token: string): Promise<string> => {
  return loginSocialMedia("/Auth/Eventbrite", token);
};

const loginSocialMedia = (url: string, token: string): Promise<string> => {
  return fetch(`${Config.api.baseRemote}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ Token: token })
  }).then((x: any) => x.json());
};
