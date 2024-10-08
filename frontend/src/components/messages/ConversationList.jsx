import { Box, List, Sheet, Typography } from "@mui/joy";
import React from "react";
import ConversationItem from "./ConversationItem";

function ConversationList({ selectedChat, setSelectedChat, chats }) {
    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                overflowY: "hidden",
                maxHeight: "85dvh",
                minHeight: "85dvh",
                display: {
                    xs: selectedChat ? "none" : "block",
                    md: "block",
                },
            }}
        >
            <Box
                sx={{
                    pt: 2,
                    px: 2,
                    pb: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Chats Pane Title */}
                <Typography fontSize="lg" component="h1" fontWeight="lg">
                    Messages
                </Typography>
            </Box>
            {/* List of chats */}
            <List
                sx={{
                    py: 0,
                    "--ListItem-paddingY": "1rem",
                    "--ListItem-paddingX": "1rem",
                    height: "100%",
                    overflowY: "auto",
                }}
            >
                {chats && chats.length === 0 && (
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                        }}
                    >
                        No chats
                    </Typography>
                )}
                {chats &&
                    chats.map((chat) => (
                        <ConversationItem
                            key={chat._id}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            chat={chat}
                        />
                    ))}
            </List>
        </Sheet>
    );
}

export default ConversationList;
