import { Box, Stack, Typography, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useState } from "react";

type Message = {
    id: number;
    text: string;
    sender: "me" | "other";
};

export default function ChatView() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hey!", sender: "other" },
        { id: 2, text: "Hi, how are you?", sender: "me" },
    ]);

    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([
            ...messages,
            { id: messages.length + 1, text: input, sender: "me" },
        ]);
        setInput("");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="97vh"
            bgcolor="#f0f2f5"
            p={2}
        >
            {/* Messages area */}
            <Stack spacing={1} flexGrow={1} overflow="auto" sx={{
                /* Hide scrollbar for Chrome, Safari, Edge */
                "&::-webkit-scrollbar": { display: "none" },
                /* Hide scrollbar for Firefox */
                scrollbarWidth: "none",
                /* Hide scrollbar for IE/Edge (legacy) */
                msOverflowStyle: "none",
            }}>
                {messages.map((msg) => (
                    <Box
                        key={msg.id}
                        display="flex"
                        justifyContent={msg.sender === "me" ? "flex-end" : "flex-start"}
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
                            <Typography variant="body1">{msg.text}</Typography>
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
                <IconButton color="secondary" onClick={handleSend}>
                    <AttachmentIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
