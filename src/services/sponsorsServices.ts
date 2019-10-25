import { Sponsor } from "./models/sponsor";
import {
  getRequest,
  PostWithFileRequest,
  PutWithFileRequest,
  deleteRequest
} from "./requestServices";

export const getSponsors = (): Promise<Sponsor[]> =>
  getRequest(`/sponsors`, new Array<Sponsor>());

export const getSponsor = (id: number): Promise<Sponsor> =>
  getRequest(`/sponsors/${id}`);

export const newSponsor = (newSponsor: Sponsor, logo: File): Promise<Sponsor> =>
  PostWithFileRequest(`/sponsors/`, logo, newSponsor);

export const updateSponsor = (
  id: number,
  sponsor: Sponsor,
  logo: File
): Promise<Sponsor> => PutWithFileRequest(`/sponsors/${id}`, logo, sponsor);
export const deleteSponsor = (id: number): Promise<boolean> => {
  return deleteRequest(`/sponsors/${id}`);
};
