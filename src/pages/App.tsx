import { Box } from "@mui/material";
import ChatView from "../components/ChatView";
import SideView from "../components/SideView";
import { useState, useEffect } from "react";
import Headers from "../atoms/Headers";
import { getCredentials } from "../network/networkClient";

const App = () => {

    const [selectedChat, setSelectedChat] = useState();

    useEffect(() => {
        getCredentials().then(cred => {
            const url = new URL('/ws/text', window.location.href);
            url.protocol = 'ws:';
            url.port = '8080';
            url.searchParams.set('deviceId', cred.deviceId);
            url.searchParams.set('sign', cred.sign);
            console.log(url);
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