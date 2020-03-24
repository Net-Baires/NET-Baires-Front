import { Member } from "./Member";
import { EventDetail } from "./Events/Event";
import { Sponsor } from "./sponsor";

export interface CommunitySummary {
  organizers: Member[];
  speakers: Member[];
  lastEvents: EventDetail[];
  sponsors: Sponsor[];
  totalEvents: number;
  totalUsersMeetup: number;
  totalSpeakers: number;
  totalUsersSlack: number;
  eventsLive: boolean;
  onlineEvent: boolean;
}
