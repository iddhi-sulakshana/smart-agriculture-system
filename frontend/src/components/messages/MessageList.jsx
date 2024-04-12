import { Box, Stack } from "@mui/joy";
import React from "react";
import ChatBubble from "./ChatBubble";
import AvatarWithStatus from "./AvatarWithStatus";

function MessageList({ loading = true, error, messages, reciever }) {
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
                    const isYou = message.senderId != reciever._id;
                    return (
                        <Stack
                            key={message._id}
                            direction="row"
                            spacing={2}
                            flexDirection={isYou ? "row-reverse" : "row"}
                        >
                            {!isYou && (
                                <AvatarWithStatus src={reciever.avatar} />
                            )}
                            <ChatBubble
                                variant={isYou ? "sent" : "received"}
                                sender={isYou ? "You" : reciever.name}
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
