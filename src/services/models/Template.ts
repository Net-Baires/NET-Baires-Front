export interface Template {
  id?: number;
  type?:
    | "EmailTemplateThanksSponsors"
    | "EmailTemplateThanksSpeakers"
    | "EmailTemplateThanksAttended";
  name?: string;
  description?: string;
  templateContent?: string;
}
