import { Box, Sheet } from "@mui/joy";
import React from "react";
import ChatHeader from "./ChatHeader";

function MessagesPane({ selectedChat }) {
    if (!selectedChat) {
        return (
            <Sheet
                sx={{
                    maxHeight: "65dvh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.level1",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                    }}
                >
                    Select a chat to start messaging
                </Box>
            </Sheet>
        );
    }
    return (
        <Sheet
            sx={{
                maxHeight: "65dvh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level1",
            }}
        >
            {/* Selected Chat User Details */}
            <ChatHeader />
            {/* Display Chat Messages */}
            {/* Message Input */}
        </Sheet>
    );
}

export default MessagesPane;
