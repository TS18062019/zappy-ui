import { Box } from "@mui/material";
import ChatView from "../components/ChatView";
import SideView from "../components/SideView";
import { useState } from "react";
import Headers from "../atoms/Headers";

const App = () => {

    const [selectedChat, setSelectedChat] = useState();

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