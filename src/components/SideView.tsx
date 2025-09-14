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
import React, { useState } from "react";
import EmptySideView from "../pages/EmptySideView";
import PeerDiscoveryView from "./PeerDiscoveryView";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../stores/store";

// const data: any[] = [
//     { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
//     { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
// ]

const SideView = ({
    setSelectedChat
}: any) => {

    const [peerDiscoveryStarted, setPeerDiscoveryStarted] = useState(false);
    const server = useSelector((state: RootState) => state.device.devices.find(s => s.name === 'server'));
    const connections = useSelector((state: RootState) => state.connection.connections);

    const dispatch = useDispatch();

    const stopPeerDiscovery = () => {
        dispatch({ type: 'SEND_COMMAND', payload: { destinationDeviceId: server?.deviceId, destinationIp: server?.ipAddr, command: 'STOP_DISCOVERY' } });
        setPeerDiscoveryStarted(false);
    }

    const startPeerDiscovery = () => {
        dispatch({ type: 'SEND_COMMAND', payload: { destinationDeviceId: server?.deviceId, destinationIp: server?.ipAddr, command: 'DISCOVER_PEERS' } });
        setPeerDiscoveryStarted(true);
    }

    const getChatSideview = () => {
        return (
            <>
                {
                    connections.length > 0 ? (
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
                                connections.map((key, idx) => {
                                    return (
                                        <>
                                            <ListItem onClick={() => setSelectedChat({ idx: idx, name: key.device.name })} key={idx} alignItems="flex-start" sx={{
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
                                                    primary={key.device.name}
                                                    secondary={
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: "text.primary", display: "inline" }}
                                                        >
                                                            {key.device.ipAddr}
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
                    <PeerDiscoveryView handleClose={stopPeerDiscovery} />
                )
            }

        </Box>
    );
};

export default SideView;
