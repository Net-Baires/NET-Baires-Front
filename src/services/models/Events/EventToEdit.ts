import { Assistant } from "../Assistant";
export interface EventToEdit {
  id: string;
  title: string;
  source: string;
  status: string;
  date: Date;
  attendees: Assistant[];
}
