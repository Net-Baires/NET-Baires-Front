import { Member } from "./models/Member";
import { Config } from "./config";
import { postRequest } from "./requestServices";

export const login = (email: string, password: string): Member => {
  return {} as Member;
};

export const loginWithMeetupToken = (token: string): Promise<string> => {
  return loginSocialMedia("/Auth/Meetup", token);
};

export const loginWithEventBriteToken = (token: string): Promise<string> => {
  return loginSocialMedia("/Auth/Eventbrite", token);
};

const loginSocialMedia = (url: string, token: string): Promise<string> =>
  postRequest(url, { Token: token });
