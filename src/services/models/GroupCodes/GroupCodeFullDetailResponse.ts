import { GetBadgeResponse } from '../BadgeDetail';
export interface GroupCodeFullDetailResponse {
    id: number;
    code: string;
    detail: string;
    open: boolean;
    members: MemberSmallDetail[];
    badges: GetBadgeResponse[];
}
export interface MemberSmallDetail {
    id: number;
    firstName: string;
    winner: boolean;
    winnerPosition: number;
    lastName: string;
    username: string;
    picture: string;
}