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
    connections: [{
        device: {
            deviceId: '06663155-557c-4b5d-9f11-7357c5148ad4',
            name: 'server',
            ipAddr: '192.168.0.105'
        },
        isActive: true
    }]
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