import { Box, Typography } from "@mui/material";

const EmptySideView = () => {

    return (
        <Box gap={2} sx={{display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h5">No chats</Typography>
                <Typography variant="body1">Click on the '+' button to discover peers!</Typography>
        </Box>
    )
}

export default EmptySideView;