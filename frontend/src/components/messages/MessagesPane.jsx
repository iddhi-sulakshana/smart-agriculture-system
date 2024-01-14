import { Box, Sheet, Stack } from "@mui/joy";
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function MessagesPane({ selectedChat, setSelectedChat }) {
    if (!selectedChat) {
        return (
            <Sheet
                sx={{
                    maxHeight: {
                        xs: "80dvh",
                        md: "65dvh",
                    },
                    flexDirection: "column",
                    backgroundColor: "background.level1",
                    display: {
                        xs: selectedChat ? "flex" : "none",
                        md: "flex",
                    },
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
                maxHeight: {
                    xs: "80dvh",
                    md: "65dvh",
                },
                height: {
                    xs: "80dvh",
                    md: "65dvh",
                },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level1",
            }}
        >
            {/* Selected Chat User Details */}
            <ChatHeader setSelectedChat={setSelectedChat} />
            {/* Display Chat Messages */}
            <MessageList
                loading={false}
                messages={[
                    {
                        id: 1,
                        message: "Hello",
                        timestamp: new Date(),
                        sender: "You",
                    },
                    {
                        id: 2,
                        message: "Hi",
                        timestamp: new Date(),
                        sender: "Jane Doe",
                    },
                ]}
            />
            {/* Message Input */}
            <MessageInput />
        </Sheet>
    );
}

export default MessagesPane;
