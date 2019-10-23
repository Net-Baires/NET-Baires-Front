import { Member } from "./models/Member";
import { Config } from "./config";

const defaultUser = <Member>{
  email: "Algun@emagil.com",
  name: "Nombre",
  lastName: "Last Name",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjkxODlmZTQwLTZhZjEtNDMwNC1iZWQ0LTBiZjE3Mjc3MGFjYSIsImVtYWlsIjoicGVwZUBwZXBlLmNvbSIsImlhdCI6MTU3MTE3NTA5OSwiZXhwIjoxNTcxMTc4NzI4fQ.ojrSNf0JByr7WzsP4xas9HsaB0xSpSfC7-IT5w2Q-Ys"
};

export const login = (email: string, password: string): Member => {
  return defaultUser;
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
