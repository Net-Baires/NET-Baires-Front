export interface Member {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  workPosition: string;
  blocked: boolean;
  organized: boolean;
  colaborator: boolean;
  linkedin: string;
  twitter: string;
  picture: string;
  averageAttendance: number;
  eventsRegistered: number;
  eventsAttended: number;
  eventsNoAttended: number;
  github: string;
  instagram: string;
  biography: string;
  attended: boolean;
  speaker: boolean;
  organizer: boolean;
}

export interface Material {
  id: number;
  title: string;
  link: string;
}

export interface CompleteEventRequest {
  thanksSponsors: boolean;
  thanksSpeakers: boolean;
  thanksAttendees: boolean;
  sendMaterialToAttendees: boolean;
}
