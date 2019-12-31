import { getRequest } from "./requestServices";
import { CommunitySummary } from "./models/communitySummary";

export const getCommunitySummary = (): Promise<CommunitySummary> =>
  getRequest("/community/summary");
