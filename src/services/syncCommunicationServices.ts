import {
  sendMessage,
  UpdateEventLive,
  CommunicationMessageType,
  sendMessageGeneral,
  MemberNotification,
  subscribe,
  subscribeGeneral,
  UpdateGroupCodeNotification,
} from "./communicationServices";

export const updateEventLive = (eventId: number) =>
  sendMessage<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, {
    eventId: eventId,
  });
export const subscribupdateEventLive = (
  callBack: (data: UpdateEventLive) => void
) => subscribeGeneral(`${CommunicationMessageType.UpdateEventLive}`, callBack);

export const memberNotification = (
  memberId: number,
  message: string,
  url: string = ""
) =>
  sendMessageGeneral<MemberNotification>(
    `${CommunicationMessageType.MemberNotification}-${memberId}`,
    { notificationMessage: message, url: url }
  );
export const subscribeMemberNotification = (
  memberId: number,
  callBack: (data: MemberNotification) => void
) =>
  subscribeGeneral(
    `${CommunicationMessageType.MemberNotification}-${memberId}`,
    callBack
  );

export const subscribeConnectedMember = (
  callBack: (connectionMessage: ConnectionMessage) => void
) => subscribeGeneral(`ConnectedMember`, callBack);
export const subscribeDisconnectedMember = (
  callBack: (connectionMessage: ConnectionMessage) => void
) => subscribeGeneral(`DisconnectedMember`, callBack);

export const updateGroupCode = (groupCodeId: number) =>
  sendMessageGeneral<UpdateGroupCodeNotification>(
    `${CommunicationMessageType.UpdateGroupCode}-${groupCodeId}`,
    { groupCodeId: groupCodeId }
  );
export const subscribeUpdateGroupCode = (
  groupCodeId: number,
  callBack: (data: UpdateGroupCodeNotification) => void
) =>
  subscribeGeneral(
    `${CommunicationMessageType.UpdateGroupCode}-${groupCodeId}`,
    callBack
  );
export interface ConnectionMessage {
  memberId: number;
  totalConnected: number;
}
