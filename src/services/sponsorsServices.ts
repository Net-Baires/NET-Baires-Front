import { Sponsor } from "./models/sponsor";
import { Config } from "./config";
import { getToken } from "./authService";

export const getSponsors = (): Promise<Sponsor[]> => {
  return fetch(`${Config.api.baseRemote}/sponsors`).then(x => x.json());
};
export const getSponsor = (id: number): Promise<Sponsor> => {
  return fetch(`${Config.api.baseRemote}/sponsors/${id}`).then(x => x.json());
};

export const newSponsor = (newSponsor: Sponsor): Promise<Sponsor> => {
  return fetch(`${Config.api.baseRemote}/sponsors/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(newSponsor)
  }).then((x: any) => x.json());
};
export const saveSponsor = (id: number, sponsor: Sponsor): Promise<Sponsor> => {
  return fetch(`${Config.api.baseRemote}/sponsors/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(sponsor)
  }).then((x: any) => x.json());
};
