import type { MessageData, StorableMessage } from "../reducers/chatReducer";
import type { Device, DeviceList } from "../reducers/deviceReducer";
import type { Command, PeerMap, TextMessage, TextMessageToServer, TextResponseFromServer } from "./types";

export const getCommonTextTemplate = (server: Device, client: Device, requiresResponse: boolean): TextMessage => {
    return {
        sourceDeviceId: client.deviceId,
        sourceIp: client.ipAddr,
        destinationDeviceId: server.deviceId,
        destinationIp: server.ipAddr,
        requiresResponse: requiresResponse
    }
}

export const buildCommandMessage = (server: Device, client: Device, command: Command): TextMessageToServer => {
    return {
        ...getCommonTextTemplate(server, client, false),
        type: "request",
        sourceName: client.name,
        command: command,
    };
}

export const buildTextMessage = (server: Device, client: Device, msgData: MessageData[]): TextMessageToServer => {
    return {
        ...getCommonTextTemplate(server, client, true),
        type: "request",
        sourceName: client.name,
        msgData: msgData
    };
}

export const buildStorableMessage = (server: Device, message: MessageData, isIncomingMessage?: boolean): StorableMessage => {
    return {
        destinationDeviceId: server.deviceId,
        destinationIp: server.ipAddr,
        msgData: {
            ...message,
            ...(isIncomingMessage ? {sender: 'other'}: {sender: 'me'})
        }
    }
}

export const buildDeviceFromTextMessage = (message: TextMessageToServer, incomingMessage: boolean): Device => {
    return {
        deviceId: incomingMessage ? message.sourceDeviceId: message.destinationDeviceId,
        ipAddr: incomingMessage ? message.sourceIp: message.destinationIp,
        name: message.sourceName,
        isConnected: true
    }
}

export const buildDeviceListFromIncomingPeers = (response: TextResponseFromServer): DeviceList => {
    const devices: Device[] = [];
    const peerMap: PeerMap = response.payload.peerMap;
    for(const deviceId of Object.keys(peerMap)) {
        devices.push({
            deviceId: deviceId,
            ipAddr: peerMap[deviceId].ipAddr,
            name: peerMap[deviceId].name,
            isConnected: false
        });
    }
    return {
        devices: devices
    };
}