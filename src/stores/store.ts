import { configureStore } from "@reduxjs/toolkit";
import chatReducer from '../reducers/chatReducer';
import deviceReducer from '../reducers/deviceReducer';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        device: deviceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>