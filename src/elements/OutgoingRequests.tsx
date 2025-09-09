import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    LinearProgress,
    Box,
    Divider,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PhoneIcon from "../assets/mobile-phone.png";
import DesktopIcon from "../assets/computer.png";

export default function OutgoingRequests() {
    const transfersInProgress = [
        { name: "Tanmoy's S23", ip: "192.168.0.101 :8080", icon: PhoneIcon, done: 15, total: 37 },
        { name: "Tanmoy's PC", ip: "192.168.0.105 :8080", icon: DesktopIcon, done: 22, total: 40 },
        { name: "Tablet", ip: "192.168.0.111 :8080", icon: PhoneIcon, done: 5, total: 12 },
        { name: "Office Laptop", ip: "192.168.0.120 :8080", icon: DesktopIcon, done: 70, total: 100 },
    ];

    const completedTransfers = [
        { name: "Old Tablet", ip: "192.168.0.90 :8080", icon: PhoneIcon, summary: "Sent 37 files, 45s" },
        { name: "Test PC", ip: "192.168.0.150 :8080", icon: DesktopIcon, summary: "Sent 12 files, 12s" },
        { name: "Media Server", ip: "192.168.0.200 :8080", icon: DesktopIcon, summary: "Sent 105 files, 2m 15s" },
    ];

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {/* Transfers in Progress */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Transfers in Progress</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 420,
                            maxHeight: 250,
                            overflow: "auto",
                            bgcolor: "background.paper",
                        }}
                    >
                        {transfersInProgress.map((device, i) => {
                            const progress = Math.round((device.done / device.total) * 100);

                            return (
                                <React.Fragment key={i}>
                                    <ListItem sx={{ flexDirection: "column", alignItems: "stretch", gap: 1 }}>
                                        {/* Top row: avatar + info */}
                                        <Box display="flex" alignItems="center" gap={2} width="100%">
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={device.icon}
                                                    alt={device.name}
                                                    sx={{ bgcolor: "grey.100", img: {width: 32, height: 32} }}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={device.name}
                                                secondary={device.ip}
                                                slotProps={{
                                                    primary: { sx: { fontWeight: 500 } },
                                                    secondary: { sx: { color: "text.secondary" } },
                                                }}
                                            />
                                        </Box>

                                        {/* Progress bar */}
                                        <Box width="100%">
                                            <LinearProgress
                                                variant="determinate"
                                                value={progress}
                                                sx={{
                                                    height: 8,
                                                    borderRadius: 4,
                                                    bgcolor: "grey.200",
                                                    "& .MuiLinearProgress-bar": { borderRadius: 4 },
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ mt: 0.5, display: "block", textAlign: "right" }}
                                            >
                                                {device.done}/{device.total}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                    {i < transfersInProgress.length - 1 && <Divider />}
                                </React.Fragment>
                            );
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>

            {/* Completed Transfers */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold" color="success.main">
                        Completed Transfers
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 420,
                            maxHeight: 250,
                            overflow: "auto",
                            bgcolor: "background.paper",
                        }}
                    >
                        {completedTransfers.map((device, i) => (
                            <React.Fragment key={i}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={device.icon}
                                            alt={device.name}
                                            sx={{ bgcolor: "grey.100", img: {width: 32, height: 32} }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={device.name}
                                        secondary={device.summary}
                                        slotProps={{
                                            primary: { sx: { fontWeight: 500 } },
                                            secondary: { sx: { color: "text.secondary" } },
                                        }}
                                    />
                                </ListItem>
                                {i < completedTransfers.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
