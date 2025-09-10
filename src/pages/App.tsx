import { Box } from "@mui/material";
import ChatView from "../components/ChatView";
import SideView from "../components/SideView";

const App = () => {

    return (
        <Box display='flex'>
            <Box flex={1}>
                <SideView />
            </Box>
            <Box flex={4}>
                <ChatView />
            </Box>
        </Box>
    )
}

export default App;