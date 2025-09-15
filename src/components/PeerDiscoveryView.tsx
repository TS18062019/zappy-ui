import { Box, CircularProgress, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../stores/store";

const PeerDiscoveryView = ({
    handleClose
}: any) => {

    const devices = useSelector((state: RootState) => state.device.devices);
    const dispatch = useDispatch();

    const onClickDevice = (index: number) => {
        dispatch({type: 'ADD_CONNECTION', payload: {device: devices[index]}});
        handleClose();
    }

    return (
        <Box flexGrow={1} gap={4} p={1}>
            <Box display='flex' justifyContent='flex-start' alignItems='center' gap={1}>
                <IconButton edge="start" size="large" onClick={handleClose}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">Searching for devices...</Typography>
                <CircularProgress variant="indeterminate" size='18px' />
            </Box>
            <Divider variant="fullWidth" />
            <List sx={{
                height: "100%", overflowY: "auto", /* Hide scrollbar for Chrome, Safari, Edge */
                "&::-webkit-scrollbar": { display: "none" },
                /* Hide scrollbar for Firefox */
                scrollbarWidth: "none",
                /* Hide scrollbar for IE/Edge (legacy) */
                msOverflowStyle: "none",
                mt: 2
            }}>
                {
                    devices.map((key, idx) => {
                        return (
                            <>
                                <ListItem key={idx} onClick={() => onClickDevice(idx)} alignItems="center" sx={{
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        bgcolor: "grey.100",
                                        transform: "translateY(-2px)",
                                        boxShadow: 3,
                                        borderRadius: 2,
                                    },
                                    cursor: 'pointer'
                                }}>
                                    <ListItemAvatar >
                                        {
                                            key.type === 'phone' ? <PhoneAndroidIcon color="primary" style={{ width: 32, height: 32 }} /> : <LaptopIcon color="primary" style={{ width: 32, height: 32 }} />
                                        }
                                    </ListItemAvatar>
                                    <ListItemText primary={key.name} secondary={
                                        <Typography component="span"
                                            variant="body2"
                                            sx={{ color: "text.primary", display: "inline" }}>{key.ipAddr}</Typography>
                                    } />
                                    <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                                        <CircleIcon sx={{ color: "green", height: 10, width: 10 }} />
                                    </Box>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default PeerDiscoveryView;