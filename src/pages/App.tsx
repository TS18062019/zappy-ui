import { Box } from "@mui/material";
import ChatView from "../components/ChatView";
import SideView from "../components/SideView";
import { useState, useEffect, useRef } from "react";
import Headers from "../atoms/Headers";
import { getCredentials } from "../network/networkClient";
import { useDispatch } from "react-redux";
import { addAllDevices, type Device } from "../reducers/deviceReducer";
import { dumpThis } from "../utils/dump";
import { THIS_DEVICE_ID, THIS_DEVICE_IP, THIS_DEVICE_NAME } from "../constants/consants";

const App = () => {

    const dispatch = useDispatch();

    const [selectedChat, setSelectedChat] = useState<Device | null>(null);
    const [thisDevice, setThisDevice] = useState();
    const runOnceRef = useRef(false);

    useEffect(() => {
        if (runOnceRef.current)
            return;
        runOnceRef.current = true;
        getCredentials().then(cred => {
            const url = new URL('/ws/text', window.location.href);
            url.protocol = 'ws:';
            url.port = '8080';
            url.searchParams.set('deviceId', cred.deviceId);
            url.searchParams.set('sign', cred.sign);
            dispatch({ type: 'WS_START', payload: { url: url.toString() } });
            dispatch(addAllDevices({
                devices: [
                    { deviceId: cred.serverId, ipAddr: cred.serverIp, name: cred.name, isConnected: true },
                    { deviceId: cred.deviceId, ipAddr: url.hostname, name: cred.name, isConnected: true }
                ]
            }));
            dumpThis(THIS_DEVICE_IP, cred.serverIp);
            dumpThis(THIS_DEVICE_ID, cred.serverId);
            dumpThis(THIS_DEVICE_NAME, cred.name);
            setThisDevice(cred.serverIp);
        });
    }, []);

    return (
        <Box display='flex' >
            <Box display='flex' flexDirection='column' flex={1}>
                <Headers text='Zappy' fontColor='primary' fontVariant='h5' noBorder />
                {thisDevice && <SideView setSelectedChat={setSelectedChat} />}
            </Box>
            <ChatView selectedChat={selectedChat} />
        </Box>
    )
}

export default App;