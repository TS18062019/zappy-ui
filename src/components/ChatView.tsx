import { Box, Stack, Typography, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AttachmentMenu from "../atoms/AttachmentMenu";
import FilePreview from "../atoms/FilePreview";
import FolderPreview from "../atoms/FolderPreview";
import EmptyChatPage from "../pages/EmptyChatPage";
import Headers from "../atoms/Headers";

type Message = {
    id: number;
    text: string;
    sender: "me" | "other";
    type?: "file" | "folder",
    size?: string
};

export default function ChatView({
    selectedChat
}: any) {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hey!", sender: "other" },
        { id: 2, text: "Hi, how are you?", sender: "me" },
        { id: 3, type: "file", text: "file.zip", size: "1 GB", sender: "other" },
        { id: 3, type: "file", text: "anotherFile.zip", size: "500 MB", sender: "me" },
        { id: 3, type: "folder", text: "notes", sender: "other" },
        { id: 3, type: "folder", text: "music", sender: "me" }
    ]);

    const [input, setInput] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([
            ...messages,
            { id: messages.length + 1, text: input, sender: "me" },
        ]);
        setInput("");
    };

    const handleAttachmentBtnClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    function getView(msg: Message): import("react").ReactNode {
        if (msg?.type === 'file')
            return <FilePreview name={msg.text} size={msg.size} />
        else if (msg?.type === 'folder')
            return <FolderPreview name={msg.text} />
        return <Typography variant="body1">{msg.text}</Typography>
    }

    return (
        selectedChat?.idx >= 0 ? (
            <Box flex={4} sx={{ border: '1px solid #f2e7e7;' }}>
                <Headers text={selectedChat.name} />
                <Box
                    display="flex"
                    flexDirection="column"
                    height="88vh"
                    bgcolor="#f0f2f5"
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
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
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
