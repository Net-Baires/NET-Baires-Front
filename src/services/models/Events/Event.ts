export interface EventDetail extends WithTemplates {
  id: number;
  title: string;
  address: string;
  description: string;
  date: string;
  imageUrl: string;
  url: string;
  done: boolean;
  live: boolean;
  online: boolean;
  onlineLink: string;
  platform: string;
  sponsors: SponsorEvent[];
  attended: number;
  registered: number;
  didNotAttend: number;
  eventId: string;
}
export interface WithTemplates {
  emailTemplateThanksSponsorsId?: number;
  emailTemplateThanksSpeakersId?: number;
  emailTemplateThanksAttendedId?: number;
}
export interface SponsorEvent {
  sponsorId: number;
  detail: string;
}

export interface UpdateEvent extends WithTemplates {
  title?: string;
  description?: string;
  generalAttended?: boolean;
  imageUrl?: string;
  url?: string;
  done?: boolean;
  live?: boolean;
}

export interface GetLinkEventLiveLink {
  onlineLink: string;
}
