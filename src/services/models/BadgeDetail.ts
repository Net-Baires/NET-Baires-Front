export interface GetBadgeResponse {
  id: number;
  created: string;
  imageUrl: string;
  name: string;
  description: string;
  badgeUrl: string;
  linkedinImageUrl: string;
  simpleImageUrl: string;
}
export interface NewBadgeRequest {
  name: string;
  description: string;
}
export interface BadgeMemberViewModel {
  assignmentDate: string;
  badge: GetBadgeResponse;
}
