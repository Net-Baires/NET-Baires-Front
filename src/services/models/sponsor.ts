export interface Sponsor {
  id: number;
  name?: string;
  description?: string;
  siteUrl?: string;
  logoUrl?: string;
  selected?: boolean;
}

export interface EventsAttendees {
  Id: number;
  Email: string;
  FirstName: string;
  LastName: string;
  Picture: string;
  Status: string;
}
