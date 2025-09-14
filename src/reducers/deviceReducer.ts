import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Device = {
    deviceId: string,
    ipAddr: string,
    name: string,
    sign?: string,
    type?: 'phone' | 'pc'
}

type DeviceList = {
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
            state.devices.push(action.payload)
        },
        removeDevice: (state, action: PayloadAction<Device>) => {
            const { deviceId } = action.payload;
            state.devices = state.devices.filter(dev => dev.deviceId !== deviceId);
        },
        addAllDevices: (state, action: PayloadAction<DeviceList>) => {
            state.devices = [
                ...action.payload.devices
            ]
        }
    }
})

export const { addDevice, removeDevice, addAllDevices } = deviceSlice.actions;
export default deviceSlice.reducer;