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
    reducers:{
        addDevice: (state, action: PayloadAction<Device>) => {
            if(!state.devices.find(d => d.deviceId === action.payload.deviceId))
                state.devices.push(action.payload);
        },
        removeDevice: (state, action: PayloadAction<Device>) => {
            const { deviceId } = action.payload;
            state.devices = state.devices.filter(dev => dev.deviceId !== deviceId);
        },
        addAllDevices: (state, action: PayloadAction<DeviceList>) => {
            state.devices = [
                ...state.devices,
                ...action.payload.devices
            ]
        },
        markConnected: (state, action: PayloadAction<{deviceId: string}>) => {
            const obj = state.devices.find(dev => dev.deviceId === action.payload.deviceId);
            if(obj)
                obj.isConnected = true;
        }
    }
})

export const { addDevice, removeDevice, addAllDevices, markConnected } = deviceSlice.actions;
export default deviceSlice.reducer;