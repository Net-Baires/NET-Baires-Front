export const Config: Config = require("Config");

export interface Api {
  base: string;
  baseRemote: string;
}

export interface Meetup {
  clientId: string;
  clientSecret: string;
  accessTokenUri: string;
  authorizationUri: string;
  redirectUri: string;
  scopes: string[];
}

export interface EventBrite {
  clientId: string;
  redirectUri: string;
}

export interface Integrations {
  meetup: Meetup;
  eventBrite: EventBrite;
}

export interface Config {
  api: Api;
  integrations: Integrations;
}
