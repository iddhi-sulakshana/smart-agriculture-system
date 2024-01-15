import { Box, Button, List, Sheet, Typography } from "@mui/joy";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React, { useState } from "react";
import ConversationItem from "./ConversationItem";
import NewChatModal from "./NewChatModal";

function ConversationList({ selectedChat, setSelectedChat }) {
    const [open, setOpen] = useState(false);
    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                overflowY: "hidden",
                maxHeight: "65dvh",
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
                <Button
                    size="md"
                    variant="outlined"
                    endDecorator={<AddRoundedIcon />}
                    onClick={() => setOpen(true)}
                >
                    New Chat
                </Button>
                <NewChatModal open={open} setOpen={setOpen} />
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
                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <ConversationItem
                            key={i}
                            setSelectedChat={setSelectedChat}
                        />
                    ))}
            </List>
        </Sheet>
    );
}

export default ConversationList;
