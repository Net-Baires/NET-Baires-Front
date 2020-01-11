
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import { getToken } from './authService';
import { Config } from './config';
var _connection: HubConnection;
export const initCommunication = () => {

    _connection = new HubConnectionBuilder()
        .withUrl(Config.api.baseRemote + "/communicationsHub", { accessTokenFactory: () => getToken() })
        .build();
    _connection.on("SendMessage", data => {
        console.log(data);
    });

    _connection.start()
        .then(() => console.log("Connected"));
}
export const sendMessage = <TData>(messageType: CommunicationMessageType, message: TData) => {
    _connection.invoke("SendMessage", new CommunicationMessage(messageType, message))
}
export const sendMessageGeneral = <TData>(messageType: string, message: TData) => {
    _connection.invoke("SendMessage", new CommunicationMessage(messageType, message))
}
export const subscribe = <TData>(messageType: CommunicationMessageType, callback: (data: TData) => void) => {
    _connection.on(messageType, callback)
}
export const subscribeGeneral = <TData>(messageType: string, callback: (data: TData) => void) => {
    _connection.on(messageType, callback)
}

export enum CommunicationMessageType {
    UpdateEventLive = "UpdateEventLive",
    MemberNotification = "MemberNotification",
    UpdateGroupCode = "UpdateGroupCode",
}

class CommunicationMessage<TData> {
    constructor(public eventName: string, public data: TData) { }
}
export interface UpdateEventLive {
    eventId: number;
}
export interface MemberNotification {
    notificationMessage: string;
}
export interface UpdateGroupCodeNotification {
    groupCodeId: number;
}