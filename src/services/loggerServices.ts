export const trackEvent = (eventName: EventName) => {
  (window as any).appInsights.trackEvent({ name: eventName });
};

export enum EventName {
  LateralMenuMyBadges = "Lateral Menu My Badges",
  LateralMenuDashboard = "Lateral Menu Dashboard",
  LateralMenuDisconnect = "Lateral Menu Disconnect",
  ProfileSaveChanges = "Profile Save Changes",
}
