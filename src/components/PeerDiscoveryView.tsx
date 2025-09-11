import { Box, LinearProgress, Typography } from "@mui/material";

const PeerDiscoveryView = () => {

    return (
        <Box>
            <Typography variant="body1">Discovering devices...</Typography>
            <LinearProgress variant="indeterminate" />
            
        </Box>
    )
}

export default PeerDiscoveryView;