import { configureStore } from "@reduxjs/toolkit";
import chatReducer from '../reducers/chatReducer';
import deviceReducer from '../reducers/deviceReducer';
import connectionReducer from '../reducers/connectionReducer';
import { websocketSaga } from "../saga/webSocketSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        device: deviceReducer,
        connection: connectionReducer
    },
   middleware: getDefault => getDefault({thunk: false}).concat(sagaMiddleWare)
});

sagaMiddleWare.run(websocketSaga);

export type RootState = ReturnType<typeof store.getState>