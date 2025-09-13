import { END, eventChannel } from "redux-saga";
import { apply, call, cancelled, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { addMessage, type WebSocketTextMessage } from "../reducers/chatReducer";
import { wsConnect, wsDisconnect } from "../reducers/webSocketReducer";
import { createWebsocketConn } from "../network/websocketClient";
import type { PayloadAction } from "@reduxjs/toolkit";

function createSocketChannel(socket: WebSocket) {
    return eventChannel(emit => {
        socket.onmessage = event => {
            try {
                const data = JSON.parse(event.data);
                emit({ type: 'INCOMING_MESSAGE', payload: data });
            } catch (err) {
                console.error("Invalid ws message", err);
            }
        };
        socket.onclose = () => emit(END);
        socket.onerror = (err) => {
            console.error('WS error', err);
            emit(END);
        }

        return () => {
            socket.close();
        }
    });
}

function* channelWatcher(socket: WebSocket): any {
    const socketChannel = yield call(createSocketChannel, socket);
    try {
        while (true) {
            const action = yield take(socketChannel);
            if (action.type === 'INCOMING_MESSAGE') {
                const data = action.payload;
                yield put(addMessage({
                    destinationDeviceId: data.destinationDeviceId,
                    destinationIp: data.destinationIp,
                    msgData: {
                        ...data.msgData,
                        sender: 'other',
                        delivered: true
                    }
                }));
            }
        }
    } finally {
        if (yield cancelled()) {
            socketChannel.close();
        }
        put(wsDisconnect());
    }
}

function* watchOutgoingMessages(socket: WebSocket): any {
    yield takeEvery('SEND_MESSAGE', function* (action: PayloadAction<WebSocketTextMessage>) {
        const payload: WebSocketTextMessage = action.payload;
        const dataToSend = {destinationDeviceId: payload.destinationDeviceId, destinationIp: payload.destinationIp, msgData: payload.data[0].payload};
        const dataToStore = {
            ...dataToSend,
            msgData: payload.data[0]
        }
        yield apply(socket, socket.send, [JSON.stringify(dataToSend)])
        yield addMessage(dataToStore);
    });
}

function* handleWebsocket(url: string): any {
    try {
        const socket = yield call(createWebsocketConn, url);
        yield put(wsConnect());

        // listen for incoming & outgoing messages
        yield fork(channelWatcher, socket);
        yield fork(watchOutgoingMessages, socket);

    } catch (err) {
        console.error("WS connection failed", err);
        yield put(wsDisconnect());
    }
}

export function* websocketSaga() {
    yield takeLatest("WS_START", function* (action: PayloadAction<{ url: string }>) {
        yield call(handleWebsocket, action.payload.url);
    })
}