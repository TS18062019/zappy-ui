import { END, eventChannel } from "redux-saga";
import { apply, call, cancelled, fork, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { addMessage, markDelivered, type StorableMessage } from "../reducers/chatReducer";
import { wsConnect, wsDisconnect } from "../reducers/webSocketReducer";
import { createWebsocketConn } from "../network/websocketClient";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addAllDevices, addDevice, type Device, type DeviceList } from "../reducers/deviceReducer";
import type { RootState } from "../stores/store";
import type { CommandToSaga, TextMessageToServer, TextResponseFromServer, TextToSaga } from "../utils/types";
import { buildCommandMessage, buildDeviceFromTextMessage, buildDeviceListFromIncomingPeers, buildStorableMessage, buildTextMessage } from "../utils/utils";
import { getFromDump } from "../utils/dump";
import { THIS_DEVICE_NAME } from "../constants/consants";

function createSocketChannel(socket: WebSocket) {
    return eventChannel(emit => {
        socket.onmessage = event => {
            try {
                const data = JSON.parse(event.data);
                if (data?.payload?.peerMap)
                    emit({ type: 'INCOMING_PEERS', payload: data })
                else if (data?.msgData)
                    emit({ type: 'INCOMING_MESSAGE', payload: data });
                else
                    emit({ type: 'DELIVERY_STATUS', payload: data })
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
                const data: TextMessageToServer = action.payload;
                const device: Device = buildDeviceFromTextMessage(data, true);
                if(data.msgData && data.msgData.length === 1) {
                    const dataToStore: StorableMessage = buildStorableMessage(device, data.msgData[0], true);
                    yield put(addMessage(dataToStore));
                }
                yield put(addDevice(device));
            } else if (action.type === 'INCOMING_PEERS') {
                const response: TextResponseFromServer = action.payload;
                const deviceList: DeviceList = buildDeviceListFromIncomingPeers(response);
                if (deviceList.devices.length > 0)
                    yield put(addAllDevices(deviceList));
            } else if (action.payload.status) {
                yield put(markDelivered({ deviceId: action.payload.sourceDeviceId }))
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
    yield takeEvery('SEND_MESSAGE', function* (action: PayloadAction<TextToSaga>) {
        const { sendTo, data } = action.payload;
        const dataToStore: StorableMessage = buildStorableMessage(sendTo, data);
        const dataToSend: TextMessageToServer = buildTextMessage(sendTo, thisDevice, [data]);
        yield apply(socket, socket.send, [JSON.stringify(dataToSend)])
        yield put(addMessage(dataToStore));
    });
    yield takeEvery('SEND_COMMAND', function* (action: PayloadAction<CommandToSaga>) {
        const { sendTo, data } = action.payload;
        const commToSend: TextMessageToServer = buildCommandMessage(sendTo, thisDevice, data);
        yield apply(socket, socket.send, [JSON.stringify(commToSend)]);
    });
}

function* watchConnections(socket: WebSocket, thisDevice: Device): any {
    yield takeEvery('ADD_CONNECTION', function* (action: PayloadAction<TextToSaga>) {
        const { sendTo } = action.payload;
        const dataToSend: TextMessageToServer = buildTextMessage(sendTo, thisDevice, []);
        yield apply(socket, socket.send, [JSON.stringify(dataToSend)]);
        yield put(addDevice(sendTo));
    });
}

function* handleWebsocket(url: string): any {
    try {
        const socket = yield call(createWebsocketConn, url);
        yield put(wsConnect());
        const thisDevice: Device = yield select((state: RootState) => state.device.devices.find(dev => dev.name === getFromDump(THIS_DEVICE_NAME)));
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