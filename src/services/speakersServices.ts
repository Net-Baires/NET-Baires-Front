import { Speaker } from "./models/speaker";
import { getRequest } from "./requestServices";

export const getSpeakers = (count: number = 10): Promise<Speaker[]> => {
  return getRequest("/speakers");
};
export const getSpeaker = (id: number): Promise<Speaker> => {
  return getRequest(`/speakers/${id}`);
};
