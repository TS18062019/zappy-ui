import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Device = {
    deviceId: string,
    ipAddr: string,
    name: string,
    sign?: string,
    type?: 'phone' | 'pc',
    isConnected: boolean
}

export type DeviceList = {
    devices: Device[]
}

const initialData: DeviceList = {
    devices: []
}

const deviceSlice = createSlice({
    name: "device",
    initialState: initialData,
    reducers: {
        addDevice: (state, action: PayloadAction<Device>) => {
            if (!state.devices.find(d => d.deviceId === action.payload.deviceId))
                state.devices.push(action.payload);
        },
        removeDevice: (state, action: PayloadAction<Device>) => {
            const { deviceId } = action.payload;
            state.devices = state.devices.filter(dev => dev.deviceId !== deviceId);
        },
        addAllDevices: (state, action: PayloadAction<DeviceList>) => {
            const existingIds = state.devices.map(i => i.deviceId);
            for (const dev of action.payload.devices) {
                if (!existingIds.includes(dev.deviceId))
                    state.devices.push(dev);
            }
        },
        markConnected: (state, action: PayloadAction<{ deviceId: string }>) => {
            state.devices = state.devices.map(dev =>
                dev.deviceId === action.payload.deviceId
                    ? { ...dev, isConnected: true }
                    : dev
            );
        }
    }
})

export const { addDevice, removeDevice, addAllDevices, markConnected } = deviceSlice.actions;
export default deviceSlice.reducer;