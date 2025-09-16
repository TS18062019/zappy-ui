import type { MessageData } from "../reducers/chatReducer"
import type { Device } from "../reducers/deviceReducer"

export interface TextMessage {
    sourceDeviceId: string,
    sourceIp: string,
    destinationDeviceId: string,
    destinationIp: string,
    requiresResponse: boolean
}

export interface TextMessageToServer extends TextMessage {
    sourceName: string,
    command?: Command,
    msgData?: MessageData[],
    type: string
}

export interface TextResponseFromServer extends TextMessage {
    status: string
    type: string,
    payload: any
}

export type TextToSaga = {
    sendTo: Device,
    data: MessageData
}

export type CommandToSaga = {
    sendTo: Device,
    data: Command
}

export type Command = "DISCOVER_PEERS" | "STOP_DISCOVERY";

export type PeerMap = {
    [key: string]: {
        name: string,
        ipAddr: string
    }
}