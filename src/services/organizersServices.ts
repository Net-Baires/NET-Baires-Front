import { Speaker } from "./models/speaker";

export const getOrganizers = (): Promise<Speaker[]> => {
  return fetch("http://localhost:3000/organizers").then(x => x.json());
};

export const getOrganizer = (id: number): Promise<Speaker> => {
  return fetch("http://localhost:3000/organizers/1").then(x => x.json());
};
