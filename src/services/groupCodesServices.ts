import { putRequest, deleteRequest, getRequest, postRequest } from './requestServices';
import { UpdateGroupCode } from './models/UpdateGroupCode';
import { GroupCodeFullDetailResponse } from './models/GroupCodes/GroupCodeFullDetailResponse';

export const updateGroupCode = (groupCodeId: number, updateGroupCode: UpdateGroupCode): Promise<boolean> => {
    return putRequest(`/groupCodes/${groupCodeId}`, updateGroupCode);
};
export const deleteGroupCode = (groupCodeId: number): Promise<boolean> => {
    return deleteRequest(`/groupCodes/${groupCodeId}`);
};

export const getGroupCodeDetail = (groupCodeId: number): Promise<GroupCodeFullDetailResponse> => {
    return getRequest(`/groupCodes/${groupCodeId}`);
};

export const assignBadgeToAttendancesInGroupCode = (groupCodeId: number, badgeId: number): Promise<boolean> => {
    return postRequest(`/groupCodes/${groupCodeId}/badges/${badgeId}`, updateGroupCode);
};