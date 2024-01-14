import { Box, Button, List, Sheet, Typography } from "@mui/joy";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import React from "react";
import ConversationItem from "./ConversationItem";

function ConversationList({ selectedChat, setSelectedChat }) {
    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                maxHeight: "60dvh",
                overflowY: "auto",
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
            </Box>
            {/* List of chats */}
            <List
                sx={{
                    py: 0,
                    "--ListItem-paddingY": "1rem",
                    "--ListItem-paddingX": "1rem",
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
