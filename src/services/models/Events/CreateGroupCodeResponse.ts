export interface CreateGroupCodeResponse {
    id: number;
    code: string;
    detail: string;
    open: boolean;
}

export interface AddMemberToGroupCodeResponse {
    id: number;
    detail: string;
}