export interface GroupCodeFullDetailResponse {
    id: number;
    code: string;
    detail: string;
    open: boolean;
    members: MemberSmallDetail[];
}
export interface MemberSmallDetail {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    picture: string;
}