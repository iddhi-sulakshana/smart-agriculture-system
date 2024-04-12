import { Box, Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import ConversationList from "../components/messages/ConversationList";
import MessagesPane from "../components/messages/MessagesPane";
import { useParams } from "react-router-dom";

function Chat() {
    const [selectedChat, setSelectedChat] = useState("");
    const { id } = useParams();
    useEffect(() => {
        if (id) setSelectedChat(id);
    }, [id]);
    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Sheet
                sx={{
                    flex: 1,
                    width: "100%",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 3fr",
                    },
                    boxShadow: 1,
                }}
            >
                <ConversationList
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />
                <MessagesPane
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />
            </Sheet>
        </Box>
    );
}

export default Chat;
