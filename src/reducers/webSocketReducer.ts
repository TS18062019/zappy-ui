import { createSlice } from "@reduxjs/toolkit"

type WebSocketStatus = {
    connected: boolean
}

const initialState: WebSocketStatus = {
    connected: false
}

const websocketSlice = createSlice({
    name: "websocket",
    initialState,
    reducers: {
        wsConnect: (state) => {
            state.connected = true;
        },
        wsDisconnect: (state) => {
            state.connected = false;
        }
    }
})

export const { wsConnect, wsDisconnect } = websocketSlice.actions;
export default websocketSlice.reducer;