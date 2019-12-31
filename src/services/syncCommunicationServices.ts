import { sendMessage, UpdateEventLive, CommunicationMessageType, sendMessageGeneral, MemberNotification, subscribe, subscribeGeneral } from './communicationServices';

export const updateEventLive = (eventId: number) =>
    sendMessage<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, { eventId: eventId });
export const memberNotification = (memberId: number, message: string) =>
    sendMessageGeneral<MemberNotification>(`${CommunicationMessageType.MemberNotification}-${memberId}`, { notificationMessage: message });
export const subscribeMemberNotification = (memberId: number, callBack: (data: MemberNotification) => void) =>
    subscribeGeneral(`${CommunicationMessageType.MemberNotification}-${memberId}`, callBack);