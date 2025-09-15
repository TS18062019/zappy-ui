import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type MessageData = {
    type?: "file" | "folder",
    sender: "me" | "other",
    payload: string,
    size?: string,
    delivered: boolean
}

export type Command = {
    destinationDeviceId: string,
    destinationIp: string,
    command: "DISCOVER_PEERS" | "STOP_DISCOVERY"
}

export type WebSocketTextMessage = {
    destinationDeviceId: string,
    destinationIp: string,
    data: MessageData[]
}

type TextMessages = {
    messages: WebSocketTextMessage[]
}

const initialState: TextMessages = {
    messages: []
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ destinationDeviceId: string, msgData: MessageData, destinationIp?: string }>) => {
            const { destinationDeviceId, msgData, destinationIp } = action.payload;
            const existing = state.messages.find(
                (msg) => msg.destinationDeviceId === destinationDeviceId
            );
            if (existing) {
                existing.data.push(msgData);
            } else {
                state.messages.push({
                    destinationDeviceId: destinationDeviceId,
                    destinationIp: destinationIp || '',
                    data: [msgData],
                });
            }
        },
        markDelivered: (state, action: PayloadAction<{ deviceId: string, index: number }>) => {
            const { deviceId, index } = action.payload;
            const messageGroup = state.messages.find(
                (msg) => msg.destinationDeviceId === deviceId
            );
            if (messageGroup?.data[index]) {
                messageGroup.data[index].delivered = true;
            }
        },
        setMessages: (state, action: PayloadAction<{ msgs: TextMessages }>) => {
            state.messages = action.payload.msgs.messages;
        }
    }
})

export const { addMessage, markDelivered, setMessages } = chatSlice.actions;
export default chatSlice.reducer;