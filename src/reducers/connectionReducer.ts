import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Device } from "./deviceReducer"

export type ConnectedDevice = {
    device: Device,
    isActive: boolean
}

type Connections = {
    connections: ConnectedDevice[]
}

const initialState: Connections = {
    connections: []
}

const connectionSlice = createSlice({
    name: "conns",
    initialState,
    reducers: {
        addConnection: (state, action: PayloadAction<ConnectedDevice>) => {
            state.connections.push(action.payload);
        },
        removeConnection: (state, action: PayloadAction<ConnectedDevice>) => {
            state.connections = state.connections.filter(conn => conn.device.deviceId !== action.payload.device.deviceId);
        }
    }
})

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;