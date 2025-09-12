import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Device = {
    deviceId: string,
    ipAddr: string,
    name: string,
    sign?: string;
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
        }
    }
})

export const { addDevice, removeDevice } = deviceSlice.actions;
export default deviceSlice.reducer;