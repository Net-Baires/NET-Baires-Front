import { Speaker } from "./models/speaker";

export const getSpeakers = (count: number = 10): Promise<Speaker[]> => {
  return fetch("http://localhost:3000/speakers").then(x => x.json());
};
export const getSpeaker = (id: number): Promise<Speaker> => {
  return fetch(`http://localhost:3000/speakers/${id}`).then(x => x.json());
};
