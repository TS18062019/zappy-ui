import { Box, Typography } from "@mui/material";
import FileTransferImage from "../assets/file_transfer.png";

const EmptyChatPage = () => {

    return (
        <Box gap={2} sx={{display: 'flex', flexGrow: 1, flex: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #f2e7e7'}}>
            <Box component="img" alt="App image" src={FileTransferImage} sx={{ borderRadius: 6}}/>
            <Typography variant="h3">Zappy</Typography>
            <Typography variant="h6">Chat & transfer files on the fly!</Typography>
        </Box>
    )
}

export default EmptyChatPage;