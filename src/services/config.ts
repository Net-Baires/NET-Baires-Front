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
  instrumentationKey: string;
  firebase: FirebaseConfig;
  pwa: PwaConfig;
}
export interface PwaConfig {
  showPopup: boolean;
}
export interface FirebaseConfig {
  pushNotifications: FirebasePushNotificationsConfig;
}
export interface FirebasePushNotificationsConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
