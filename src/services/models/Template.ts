export interface Template {
  id?: number;
  type?:
    | "EmailTemplateThanksSponsors"
    | "EmailTemplateThanksSpeakers"
    | "EmailTemplateThanksSponsors";
  name?: string;
  description?: string;
  templateContent?: string;
}
