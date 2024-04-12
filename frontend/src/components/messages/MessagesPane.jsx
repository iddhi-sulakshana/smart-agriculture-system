import { Box, Sheet, Stack } from "@mui/joy";
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useGetMessages from "../../hooks/useGetMessages";
import useGetReciever from "../../hooks/useGetReciever";

function MessagesPane({ selectedChat, setSelectedChat }) {
    const messages = useGetMessages(selectedChat);
    const reciever = useGetReciever(selectedChat);

    if (!selectedChat) {
        return (
            <Sheet
                sx={{
                    maxHeight: {
                        xs: "80dvh",
                        md: "85dvh",
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
                    md: "85dvh",
                },
                height: {
                    xs: "80dvh",
                    md: "85dvh",
                },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level1",
            }}
        >
            {/* Selected Chat User Details */}
            <ChatHeader setSelectedChat={setSelectedChat} reciever={reciever} />
            {/* Display Chat Messages */}
            <MessageList
                loading={false}
                messages={messages}
                reciever={reciever}
            />
            {/* Message Input */}
            <MessageInput />
        </Sheet>
    );
}

export default MessagesPane;
