import { Box, Stack } from "@mui/joy";
import React from "react";
import ChatBubble from "./ChatBubble";
import AvatarWithStatus from "./AvatarWithStatus";

function MessageList({ loading = true, error, messages }) {
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                }}
            >
                Loading messages...
            </Box>
        );
    }
    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                }}
            >
                Error loading messages...
            </Box>
        );
    }
    if (!messages || messages?.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                }}
            >
                No messages to display...
            </Box>
        );
    }
    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                px: 2,
                py: 3,
                overflowY: "scroll",
                flexDirection: "column-reverse",
            }}
        >
            <Stack spacing={2} justifyContent="flex-end">
                {messages.map((message) => {
                    // Check if the message is sent by you
                    const isYou = message.sender === "You";
                    return (
                        <Stack
                            key={message.id}
                            direction="row"
                            spacing={2}
                            flexDirection={isYou ? "row-reverse" : "row"}
                        >
                            {message.sender !== "You" && (
                                <AvatarWithStatus
                                // src={selectedChat.participant.avatar}
                                />
                            )}
                            <ChatBubble
                                variant={isYou ? "sent" : "received"}
                                {...message}
                            />
                        </Stack>
                    );
                })}
            </Stack>
        </Box>
    );
}
export default MessageList;
