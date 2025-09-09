import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Avatar,
    Button,
    Stack,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "../assets/mobile-phone.png";
import DesktopIcon from "../assets/computer.png";
import React from "react";

export default function IncomingRequests() {

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography fontWeight="bold">Pending Requests</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 420,
                            maxHeight: 300,          // limit height
                            overflow: "auto",        // enable scroll
                            bgcolor: "background.paper",
                        }}
                    >
                        {[
                            { name: "Tanmoy's S23", ip: "192.168.0.101", icon: PhoneIcon },
                            { name: "Tanmoy's PC", ip: "192.168.0.105", icon: DesktopIcon },
                            { name: "Office Laptop", ip: "192.168.0.120", icon: DesktopIcon },
                            { name: "Tablet", ip: "192.168.0.111", icon: PhoneIcon },
                        ].map((device, i) => (
                            <React.Fragment key={i}>
                                <ListItem
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "stretch",
                                        py: 1.5,
                                    }}
                                >
                                    {/* Top: avatar + text */}
                                    <Box display="flex" alignItems="center" gap={2} width="100%">
                                        <Avatar
                                            src={device.icon}
                                            alt={device.name}
                                            sx={{ bgcolor: "grey.100", img: { width: 32, height: 32 } }}
                                        />
                                        <Box>
                                            <Typography fontWeight="500">{device.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {device.ip}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Bottom: smaller buttons */}
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="flex-end"
                                        sx={{ mt: 1, width: "100%" }}
                                    >
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={<VisibilityIcon />}
                                            sx={{ minWidth: 64, fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<CloseIcon />}
                                            sx={{ minWidth: 64, fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            Reject
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            startIcon={<CheckCircleIcon />}
                                            sx={{ minWidth: 72, fontSize: "0.7rem", py: 0.3 }}
                                        >
                                            Confirm
                                        </Button>
                                    </Stack>
                                </ListItem>

                                {i < 3 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography component="span" fontWeight="bold" color="error.main">
                        Rejected Devices
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 420,
                            bgcolor: "background.paper",
                        }}
                    >
                        {[
                            { name: "Old Tablet", ip: "192.168.0.90 :8080", icon: PhoneIcon },
                            { name: "Test PC", ip: "192.168.0.150 :8080", icon: DesktopIcon },
                        ].map((device, i) => (
                            <React.Fragment key={i}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            src={device.icon}
                                            alt={device.name}
                                            sx={{ width: 32, height: 32, bgcolor: "grey.100" }}
                                        />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={device.name}
                                        secondary={device.ip}
                                        slotProps={{
                                            primary: {
                                                sx: { fontWeight: 500, color: "error.main" },
                                            },
                                            secondary: {
                                                sx: { color: "text.secondary" },
                                            },
                                        }}
                                    />
                                </ListItem>
                                {i < 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>

        </Box>
    );
}
