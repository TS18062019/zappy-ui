import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type MessageData = {
    type?: "file" | "folder",
    sender: "me" | "other",
    payload: string,
    size?: string,
    delivered: boolean
}

type WebSocketTextMessageStoreState = {
    destinationDeviceId: string,
    destinationIp: string,
    data: MessageData[]
}

type TextMessages = {
    messages: WebSocketTextMessageStoreState[]
}

const initialState: TextMessages = {
    messages: [
        {
            destinationDeviceId: '1234',
            destinationIp: '123.456.789',
            data: [
                {
                    delivered: false,
                    sender: 'other',
                    payload: 'Hey!',
                },
                {
                    delivered: false,
                    sender: 'me',
                    payload: 'Hi, how are you?',
                },
                {
                    delivered: false,
                    sender: 'other',
                    payload: 'file.zip',
                    type: 'file',
                    size: '1 GB'
                },
                {
                    delivered: false,
                    sender: 'me',
                    payload: 'anotherFile.zip',
                    type: 'file',
                    size: '500 MB'
                },
                {
                    delivered: false,
                    sender: 'other',
                    payload: 'notes',
                    type: 'folder'
                },
                {
                    delivered: false,
                    sender: 'me',
                    payload: 'music',
                    type: 'folder'
                }
            ]
        }
    ]
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<{ deviceId: string, msgData: MessageData, desnIp?: string }>) => {
            const { deviceId, msgData, desnIp } = action.payload;
            const existing = state.messages.find(
                (msg) => msg.destinationDeviceId === deviceId
            );
            if (existing) {
                existing.data.push(msgData);
            } else {
                state.messages.push({
                    destinationDeviceId: deviceId,
                    destinationIp: desnIp || '',
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