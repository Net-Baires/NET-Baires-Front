import { MeEvent } from "./models/Events/MeEvent";
import { getRequest } from "./requestServices";

export const syncBadges = (): Promise<boolean> => {
  return getRequest("/badges/sync");
};
