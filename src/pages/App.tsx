import { Box } from "@mui/material";
import ChatView from "../components/ChatView";
import SideView from "../components/SideView";
import { useState, useEffect, useRef } from "react";
import Headers from "../atoms/Headers";
import { getCredentials } from "../network/networkClient";
import { useDispatch } from "react-redux";

const App = () => {

    const dispatch = useDispatch();

    const [selectedChat, setSelectedChat] = useState();
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
        });
    }, []);

    return (
        <Box display='flex'>
            <Box display='flex' flexDirection='column' flex={1}>
                <Headers text='Zappy' fontColor='primary' fontVariant='h5' noBorder />
                <SideView setSelectedChat={setSelectedChat} />
            </Box>
            <ChatView selectedChat={selectedChat} />
        </Box>
    )
}

export default App;