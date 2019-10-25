import { Sponsor } from "./models/sponsor";
import {
  getRequest,
  postWithFileRequest,
  putWithFileRequest,
  deleteRequest
} from "./requestServices";

export const getSponsors = (): Promise<Sponsor[]> =>
  getRequest(`/sponsors`, new Array<Sponsor>());

export const getSponsor = (id: number): Promise<Sponsor> =>
  getRequest(`/sponsors/${id}`);

export const newSponsor = (newSponsor: Sponsor, logo: File): Promise<Sponsor> =>
  postWithFileRequest(`/sponsors/`, logo, newSponsor);

export const updateSponsor = (
  id: number,
  sponsor: Sponsor,
  logo: File
): Promise<Sponsor> => putWithFileRequest(`/sponsors/${id}`, logo, sponsor);
export const deleteSponsor = (id: number): Promise<boolean> => {
  return deleteRequest(`/sponsors/${id}`);
};
