import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Box,
    Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useRef, useState } from "react";
import EmptySideView from "../pages/EmptySideView";
import PeerDiscoveryView from "./PeerDiscoveryView";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../stores/store";
import type { Device } from "../reducers/deviceReducer";
import { getFromDump } from "../utils/dump";
import { SERVER_ID, THIS_DEVICE_ID, THIS_DEVICE_IP } from "../constants/consants";
import type { CommandToSaga } from "../utils/types";

const SideView = ({
    setSelectedChat
}: { setSelectedChat: React.Dispatch<React.SetStateAction<Device | null>> }) => {

    const thisDeviceRef = useRef(getFromDump(THIS_DEVICE_ID));
    const thisDeviceIp = useRef(getFromDump(THIS_DEVICE_IP));
    const serverRef = useRef(getFromDump(SERVER_ID));
    const [peerDiscoveryStarted, setPeerDiscoveryStarted] = useState(false);
    const server = useSelector((state: RootState) => state.device.devices.find(s => s.deviceId === serverRef.current));
    // remove self ui & server from list
    const connectedDevices = useSelector((state: RootState) => state.device.devices.filter(dev => dev.isConnected && dev.ipAddr !== thisDeviceIp.current));
    console.log('server', server);
    console.log('cd', connectedDevices);
    console.log('thisDevice', thisDeviceRef.current);
    const dispatch = useDispatch();

    const stopPeerDiscovery = () => {
        console.log('stopping discovery...');
        if (server) {
            const payload: CommandToSaga = { sendTo: server, data: "STOP_DISCOVERY" };
            dispatch({ type: 'SEND_COMMAND', payload: payload });
            setPeerDiscoveryStarted(false);
        }
    }

    const startPeerDiscovery = () => {
        console.log('starting discovery...');
        if (server) {
            const payload: CommandToSaga = { sendTo: server, data: "DISCOVER_PEERS" };
            dispatch({ type: 'SEND_COMMAND', payload: payload });
            setPeerDiscoveryStarted(true);
        }
    }

    const getChatSideview = () => {
        return (
            <>
                {
                    thisDeviceRef.current && connectedDevices.length > 0 ? (
                        <List sx={{
                            height: "100%", overflowY: "auto", /* Hide scrollbar for Chrome, Safari, Edge */
                            "&::-webkit-scrollbar": { display: "none" },
                            /* Hide scrollbar for Firefox */
                            scrollbarWidth: "none",
                            /* Hide scrollbar for IE/Edge (legacy) */
                            msOverflowStyle: "none",
                            flex: 1
                        }}>
                            {
                                connectedDevices.map((key, idx) => {
                                    return (
                                        <>
                                            <ListItem onClick={() => setSelectedChat(connectedDevices[idx])} key={idx} alignItems="flex-start" sx={{
                                                transition: "all 0.2s ease",
                                                "&:hover": {
                                                    bgcolor: "grey.100",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: 3,
                                                    borderRadius: 2,
                                                },
                                                cursor: 'pointer'
                                            }}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={key.name}
                                                    secondary={
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: "text.primary", display: "inline" }}
                                                        >
                                                            {key.ipAddr}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    )
                                })
                            }
                        </List>
                    ) : (
                        <EmptySideView />
                    )
                }
                <Fab
                    color="primary"
                    sx={{ position: "absolute", bottom: 24, right: 8 }}
                    onClick={startPeerDiscovery}
                >
                    <AddIcon />
                </Fab>
            </>
        )
    }

    return (
        <Box
            position="relative"
            height="86vh"
            width="100%"
            maxWidth={360}
            bgcolor="background.paper"
            display='flex'
        >
            {
                !peerDiscoveryStarted ? (
                    getChatSideview()
                ) : (
                    <PeerDiscoveryView handleClose={stopPeerDiscovery} thisDevice={thisDeviceIp.current}/>
                )
            }

        </Box>
    );
};

export default SideView;
