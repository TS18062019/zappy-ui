import { Box, Stack, Typography, IconButton } from "@mui/material";
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

export default function ChatView({
    selectedChat
}: any) {

    const messages = useSelector((state: RootState) => {
        const device = state.chat.messages.find(msg => msg.destinationDeviceId === '1234');
        return device?.data || [];
    });
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleSend = () => {
        if (!input.trim()) return;
        dispatch(addMessage({ deviceId: '1234', msgData: { delivered: false, sender: 'me', payload: input } }));
        setInput("");
    };

    const handleAttachmentBtnClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    function getView(msg: MessageData): import("react").ReactNode {
        if (msg?.type === 'file')
            return <FilePreview name={msg.payload} size={msg.size} />
        else if (msg?.type === 'folder')
            return <FolderPreview name={msg.payload} />
        return <Typography variant="body1">{msg.payload}</Typography>
    }

    return (
        selectedChat?.idx >= 0 ? (
            <Box flex={4} sx={{ border: '1px solid #f2e7e7;' }}>
                <Headers text={selectedChat.name} />
                <Box
                    display="flex"
                    flexDirection="column"
                    height="89vh"
                    bgcolor="#e3eeff"
                    p={2}
                >{/* Messages area */}
                    <Stack
                        spacing={1}
                        flexGrow={1}
                        overflow="auto"
                        sx={{
                            /* Hide scrollbar for Chrome, Safari, Edge */
                            "&::-webkit-scrollbar": { display: "none" },
                            /* Hide scrollbar for Firefox */
                            scrollbarWidth: "none",
                            /* Hide scrollbar for IE/Edge (legacy) */
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
                                    px={2}
                                    py={1}
                                    mb={1}
                                    borderRadius={2}
                                    maxWidth="60%"
                                    bgcolor={msg.sender === "me" ? "#dcf8c6" : "#fff"}
                                    boxShadow={1}
                                >
                                    {
                                        getView(msg)
                                    }
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
                        alignItems="center"
                    >
                        <IconButton color="primary" onClick={handleAttachmentBtnClick}>
                            <AddIcon />
                        </IconButton>
                        <input
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                fontSize: "16px",
                                padding: "8px",
                            }}
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <IconButton color="primary" onClick={handleSend}>
                            <SendIcon />
                        </IconButton>
                        <AttachmentMenu open={open} anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
                    </Box>
                </Box>
            </Box>

        ) : (
            <EmptyChatPage />
        )
    );
};
