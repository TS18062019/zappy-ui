import { configureStore } from "@reduxjs/toolkit";
import chatReducer from '../reducers/chatReducer';
import deviceReducer from '../reducers/deviceReducer';
import { websocketSaga } from "../saga/webSocketSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        device: deviceReducer
    },
   middleware: getDefault => getDefault({thunk: false}).concat(sagaMiddleWare)
});

sagaMiddleWare.run(websocketSaga);

export type RootState = ReturnType<typeof store.getState>