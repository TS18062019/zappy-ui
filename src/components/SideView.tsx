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

const data: any[] = [
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' },
    { id: 1, a: 'Brunch this weekend?', b: 'Ali Connors', c: ' — I\'ll be in your neighborhood doing errands this…' },
    { id: 2, a: 'Summer BBQ', b: 'to Scott, Alex, Jennifer', c: ' — Do you have Paris recommendations? Have you ever…' }
]

const SideView = ({
    setSelectedChat
}: any) => {

    const [peerDiscoveryStarted, setPeerDiscoveryStarted] = useState(false);

    const stopPeerDiscovery = () => {
        setPeerDiscoveryStarted(false);
    }

    const getChatSideview = () => {
        return (
            <>
                {
                    data.length > 0 ? (
                        <List sx={{
                            height: "100%", overflowY: "auto", /* Hide scrollbar for Chrome, Safari, Edge */
                            "&::-webkit-scrollbar": { display: "none" },
                            /* Hide scrollbar for Firefox */
                            scrollbarWidth: "none",
                            /* Hide scrollbar for IE/Edge (legacy) */
                            msOverflowStyle: "none",
                        }}>
                            {
                                data.map((key, idx) => {
                                    return (
                                        <>
                                            <ListItem onClick={() => setSelectedChat({ idx: idx, name: key.b })} key={idx} alignItems="flex-start" sx={{
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
                                                    primary={key.a}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                sx={{ color: "text.primary", display: "inline" }}
                                                            >
                                                                {key.b}
                                                            </Typography>
                                                            {key.c}
                                                        </React.Fragment>
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
                    onClick={() => setPeerDiscoveryStarted(true)}
                >
                    <AddIcon />
                </Fab>
            </>
        )
    }

    return (
        <Box
            position="relative"
            height="89vh"
            width="100%"
            maxWidth={360}
            bgcolor="background.paper"
            display='flex'
        >
            {
                !peerDiscoveryStarted ? (
                    getChatSideview()
                ) : (
                    <PeerDiscoveryView handleClose={stopPeerDiscovery}/>
                )
            }

        </Box>
    );
};

export default SideView;
