import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type MessageData = {
    type?: "file" | "folder",
    sender: "me" | "other",
    payload: string,
    size?: string,
    delivered: boolean
}

export type WebSocketTextMessage = {
    destinationDeviceId: string,
    destinationIp: string,
    data: MessageData[]
}

export type StorableMessage = {
    destinationDeviceId: string,
    msgData: MessageData,
    destinationIp: string
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
        addMessage: (state, action: PayloadAction<StorableMessage>) => {
            const { destinationDeviceId, msgData, destinationIp } = action.payload;
            const existing = state.messages.find(
                (msg) => msg.destinationDeviceId === destinationDeviceId
            );
            if (existing) {
                existing.data.push(msgData);
            } else {
                state.messages.push({
                    destinationDeviceId: destinationDeviceId,
                    destinationIp: destinationIp,
                    data: [msgData],
                });
            }
        },
        markDelivered: (state, action: PayloadAction<{ deviceId: string }>) => {
            const { deviceId } = action.payload;
            const messageGroup = state.messages.find(
                (msg) => msg.destinationDeviceId === deviceId
            );
            let lastIndex = 0;
            if (messageGroup?.data.length && messageGroup?.data.length > 0)
                lastIndex = messageGroup?.data.length - 1;
            if (messageGroup?.data[lastIndex]) {
                messageGroup.data[lastIndex].delivered = true;
            }
        },
        setMessages: (state, action: PayloadAction<{ msgs: TextMessages }>) => {
            state.messages = action.payload.msgs.messages;
        }
    }
})

export const { addMessage, markDelivered, setMessages } = chatSlice.actions;
export default chatSlice.reducer;