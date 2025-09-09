import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

export default function IncomingRequests() {

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt='phone' src="" />
                </ListItemAvatar>
                <ListItemText
                    primary="Tanmoy's S23"
                    secondary={
                        <>
                            <Typography 
                                component='span' 
                                variant="body2"
                                sx={{color: 'text.primary', display: 'inline'}}
                                >
                                192.168.0.101
                            </Typography>
                            {" :8080"}
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component='li' />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt='phone' src="" />
                </ListItemAvatar>
                <ListItemText
                    primary="Tanmoy's PC"
                    secondary={
                        <>
                            <Typography 
                                component='span' 
                                variant="body2"
                                sx={{color: 'text.primary', display: 'inline'}}
                                >
                                192.168.0.105
                            </Typography>
                            {" :8080"}
                        </>
                    }
                />
            </ListItem>
        </List>
    )
}