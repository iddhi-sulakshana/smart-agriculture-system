import { Box, Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import ConversationList from "../components/messages/ConversationList";
import MessagesPane from "../components/messages/MessagesPane";
import { useParams } from "react-router-dom";
import useGetChats from "../hooks/useGetChats";
import { SocketProvider } from "../contexts/SocketContext";

function Chat() {
    const { chats, setChats } = useGetChats();
    const [selectedChat, setSelectedChat] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (id) setSelectedChat(id);
    }, [id]);
    return (
        <SocketProvider>
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
                        chats={chats}
                    />
                    <MessagesPane
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        setChats={setChats}
                    />
                </Sheet>
            </Box>
        </SocketProvider>
    );
}

export default Chat;
