import { Box, Button, FormControl, Stack, Textarea } from "@mui/joy";
import React, { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { toast } from "react-toastify";
import axios from "axios";
import { getURL } from "../../Utils/Url";
import UserContext from "../../contexts/UserContext";

function MessageInput({ setMessages, selectedChat, messages, setChats }) {
    const [textAreaValue, setTextAreaValue] = useState("");
    const { token } = UserContext();

    const handleSend = () => {
        if (textAreaValue.trim() === "")
            return toast.error("Message cannot be empty");
        axios
            .request({
                method: "PATCH",
                url: getURL("chat/" + selectedChat),
                headers: {
                    "x-auth-token": token,
                },
                data: {
                    message: textAreaValue,
                },
            })
            .then((res) => {
                setMessages([...messages, res.data]);
                setChats((prevChats) => {
                    const newChats = [...prevChats];
                    const chatIndex = newChats.findIndex(
                        (chat) => chat._id === selectedChat
                    );
                    newChats[chatIndex].lastMessage = res.data;
                    return newChats;
                });
                setTextAreaValue("");
            })
            .catch((error) => {
                toast.error("Error sending message: " + error.message);
            });
    };
    return (
        <Box sx={{ px: 2, mb: 1 }}>
            <FormControl>
                {/* Text Area to input messages to send */}
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
                    value={textAreaValue}
                    minRows={2}
                    maxRows={2}
                    endDecorator={
                        <Stack
                            alignItems="flex-end"
                            flexGrow={1}
                            sx={{
                                py: 1,
                                pr: 1,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Button
                                size="md"
                                color="primary"
                                endDecorator={<SendRoundedIcon />}
                                onClick={handleSend}
                            >
                                Send
                            </Button>
                        </Stack>
                    }
                    // Handle enter key press to submit message
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleSend();
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
}

export default MessageInput;
