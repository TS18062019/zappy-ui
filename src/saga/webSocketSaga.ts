import { END, eventChannel } from "redux-saga";
import { apply, call, cancelled, fork, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { addMessage, type Command, type WebSocketTextMessage } from "../reducers/chatReducer";
import { wsConnect, wsDisconnect } from "../reducers/webSocketReducer";
import { createWebsocketConn } from "../network/websocketClient";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addAllDevices, type Device } from "../reducers/deviceReducer";
import { addConnection, type ConnectedDevice } from "../reducers/connectionReducer";
import type { RootState } from "../stores/store";

function createSocketChannel(socket: WebSocket) {
    return eventChannel(emit => {
        socket.onmessage = event => {
            try {
                const data = JSON.parse(event.data);
                if(data?.payload?.peerMap)
                    emit({ type: 'INCOMING_PEERS', payload: data.payload.peerMap })
                else 
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
            } else if (action.type === 'INCOMING_PEERS') {
                const deviceList = [];
                for (const devId of Object.keys(action.payload)) {
                    const obj = action.payload[devId];
                    deviceList.push({
                        deviceId: devId,
                        ipAddr: obj.ipAddr,
                        name: obj.name
                    });
                }
                if (deviceList.length > 0)
                    yield put(addAllDevices({ devices: deviceList }))
            }
        }
    } finally {
        if (yield cancelled()) {
            socketChannel.close();
        }
        put(wsDisconnect());
    }
}

function* watchOutgoingMessages(socket: WebSocket, thisDevice: Device): any {
    yield takeEvery('SEND_MESSAGE', function* (action: PayloadAction<WebSocketTextMessage>) {
        const payload: WebSocketTextMessage = action.payload;
        const dataToStore = { destinationDeviceId: payload.destinationDeviceId, destinationIp: payload.destinationIp, msgData: payload.data[0] };
        const dataToSend = {
            ...dataToStore,
            msgData: payload.data,
            sourceDeviceId: thisDevice.deviceId,
            sourceIp: thisDevice.ipAddr,
            type: "request"
        }
        yield apply(socket, socket.send, [JSON.stringify(dataToSend)])
        yield put(addMessage(dataToStore));
    });
    yield takeEvery('SEND_COMMAND', function* (action: PayloadAction<Command>) {
        let payload = {
            ...action.payload,
            type: "request"
        }
        yield apply(socket, socket.send, [JSON.stringify(payload)]);
    });
}

function* watchConnections(socket: WebSocket, thisDevice: Device): any {
    yield takeEvery('ADD_CONNECTION', function* (action: PayloadAction<ConnectedDevice>) {
        const payload: ConnectedDevice = action.payload;
        const dataToSend = { type: "request", destinationDeviceId: payload.device.deviceId, destinationIp: payload.device.ipAddr, sourceDeviceId: thisDevice.deviceId, sourceIp: thisDevice.ipAddr, msgData: [] };
        yield apply(socket, socket.send, [JSON.stringify(dataToSend)]);
        yield put(addConnection({ ...payload, isActive: true }));
    });
}

function* handleWebsocket(url: string): any {
    try {
        const socket = yield call(createWebsocketConn, url);
        yield put(wsConnect());
        const thisDevice: Device = yield select((state: RootState) => state.device.devices.find(dev => dev.name === 'this'));
        // listen for incoming & outgoing messages
        yield fork(channelWatcher, socket);
        yield fork(watchConnections, socket, thisDevice);
        yield fork(watchOutgoingMessages, socket, thisDevice);

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