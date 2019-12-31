import { sendMessage, UpdateEventLive, CommunicationMessageType, sendMessageGeneral, MemberNotification, subscribe, subscribeGeneral } from './communicationServices';

export const updateEventLive = (eventId: number) =>
    sendMessage<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, { eventId: eventId });
export const subscribupdateEventLive = (callBack: (data: UpdateEventLive) => void) =>
    subscribeGeneral(`${CommunicationMessageType.UpdateEventLive}`, callBack);
export const memberNotification = (memberId: number, message: string) =>
    sendMessageGeneral<MemberNotification>(`${CommunicationMessageType.MemberNotification}-${memberId}`, { notificationMessage: message });
export const subscribeMemberNotification = (memberId: number, callBack: (data: MemberNotification) => void) =>
    subscribeGeneral(`${CommunicationMessageType.MemberNotification}-${memberId}`, callBack);



export const subscribeConnectedMember = (callBack: (connectionMessage: ConnectionMessage) => void) =>
    subscribeGeneral(`ConnectedMember`, callBack);
export const subscribeDisconnectedMember = (callBack: (connectionMessage: ConnectionMessage) => void) =>
    subscribeGeneral(`DisconnectedMember`, callBack);



export interface ConnectionMessage {
    memberId: number;
    totalConnected: number;
}