import { Box, Stack, Typography, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AttachmentMenu from "../atoms/AttachmentMenu";
import FilePreview from "../atoms/FilePreview";
import FolderPreview from "../atoms/FolderPreview";
import EmptyChatPage from "../pages/EmptyChatPage";
import Headers from "../atoms/Headers";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../stores/store";
import { addMessage, type MessageData } from "../reducers/chatReducer";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ChatView({
    selectedChat
}: any) {

    const messages = useSelector((state: RootState) => {
        const device = state.chat.messages.find(
            msg => msg.destinationDeviceId === '06663155-557c-4b5d-9f11-7357c5148ad4'
        );
        return device?.data || [];
    });
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleSend = () => {
        if (!input.trim()) return;
        dispatch(addMessage({
            destinationDeviceId: '06663155-557c-4b5d-9f11-7357c5148ad4',
            destinationIp: '192.168.0.105',
            msgData: { sender: 'me', payload: input, delivered: false }
        }));
        setInput("");
    };

    const handleAttachmentBtnClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function getView(msg: MessageData): import("react").ReactNode {
        if (msg?.type === 'file')
            return <FilePreview name={msg.payload} size={msg.size} />;
        else if (msg?.type === 'folder')
            return <FolderPreview name={msg.payload} />;
        return (
            <Typography
                variant="body1"
                sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
            >
                {msg.payload}
            </Typography>
        );
    }

    return (
        selectedChat?.idx >= 0 ? (
            <Box flex={4} sx={{ border: '1px solid #f2e7e7' }}>
                <Headers text={selectedChat.name} />
                <Box
                    display="flex"
                    flexDirection="column"
                    height="86vh"
                    bgcolor="#e3eeff"
                    p={2}
                >
                    {/* Messages area */}
                    <Stack
                        spacing={1}
                        flexGrow={1}
                        overflow="auto"
                        sx={{
                            "&::-webkit-scrollbar": { display: "none" },
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {messages.map((msg, idx) => (
                            <Box
                                key={idx}
                                display="flex"
                                justifyContent={
                                    msg.sender === "me" ? "flex-end" : "flex-start"
                                }
                            >
                                <Box
                                    px={3}
                                    py={1.75}
                                    mb={1}
                                    borderRadius={2}
                                    maxWidth="60%"
                                    bgcolor={msg.sender === "me" ? "#d5f3beff" : "#fdfdfdff"}
                                    boxShadow={1}
                                    position="relative"
                                >
                                    {getView(msg)}
                                    {msg.sender === "me" && (
                                        <Box display="flex" justifyContent="flex-end" position="absolute" alignItems="center" bottom={1} right={1} p={1}>
                                            {
                                                msg.delivered ? <DoneAllIcon sx={{ fontSize: 16, color: '#34B7F1' }} />
                                                : msg.type === undefined && <AccessTimeIcon sx={{ fontSize: 12, color: 'grey' }} />
                                            }
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Stack>

                    {/* Input area */}
                    <Box
                        display="flex"
                        p={1}
                        bgcolor="white"
                        borderRadius={2}
                        boxShadow={1}
                        alignItems="flex-end"
                        gap={1}
                    >
                        <IconButton color="primary" onClick={handleAttachmentBtnClick} size="large">
                            <AddIcon />
                        </IconButton>

                        <TextField
                            multiline
                            maxRows={6}
                            placeholder="Type a message..."
                            variant="outlined"
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    border: "none",
                                    fontSize: "16px",
                                    padding: "10px 2px",
                                },
                                "& fieldset": { border: "none" }
                            }}
                            slotProps={{
                                input: { disableUnderline: true }
                            }}

                        />

                        <IconButton color="primary" onClick={handleSend} size="large">
                            <SendIcon />
                        </IconButton>

                        <AttachmentMenu
                            open={open}
                            anchorEl={anchorEl}
                            handleMenuClose={handleMenuClose}
                        />
                    </Box>
                </Box>
            </Box>
        ) : (
            <EmptyChatPage />
        )
    );
};
