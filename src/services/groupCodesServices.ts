import { putRequest, deleteRequest } from './requestServices';
import { UpdateGroupCode } from './models/UpdateGroupCode';

export const updateGroupCode = (groupCodeId: number, updateGroupCode: UpdateGroupCode): Promise<boolean> => {
    return putRequest(`/groupCodes/${groupCodeId}`, updateGroupCode);
};
export const deleteGroupCode = (groupCodeId: number): Promise<boolean> => {
    return deleteRequest(`/groupCodes/${groupCodeId}`);
};
