import { Box, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import AvatarWithStatus from "./AvatarWithStatus";
import { DisplayRelativeTime } from "../../Utils/DateTime";

function ConversationItem({ selectedChat, setSelectedChat, chat }) {
    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    onClick={() => {
                        setSelectedChat(chat._id);
                    }}
                    selected={selectedChat === chat._id}
                    color="neutral"
                    sx={{
                        flexDirection: "column",
                        alignItems: "initial",
                        gap: 1,
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* Chat User Icon */}

                        <AvatarWithStatus
                            src={chat?.participants[0]?.avatar}
                            online={chat?.online}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                {/* Display Chat User Name */}
                                <Typography level="title-sm">
                                    {chat?.participants[0]?.name}
                                </Typography>
                                <Box
                                    sx={{
                                        lineHeight: 1.5,
                                        textAlign: "right",
                                    }}
                                >
                                    {/* Display Sent Time ex: "just now" if within 1 minute, "1 minute ago", "5 days ago" */}
                                    <Typography
                                        level="body-xs"
                                        display="block"
                                        noWrap
                                    >
                                        {DisplayRelativeTime(
                                            chat?.lastMessage?.timestamp
                                        )}
                                    </Typography>
                                </Box>
                            </Stack>
                            {/* Display the last message of the chat */}
                            <Typography
                                level="body-sm"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {chat?.lastMessage ? (
                                    chat?.lastMessage?.isProduct ? (
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                level="body-xs"
                                                sx={{
                                                    display: "inline",
                                                }}
                                            >
                                                sent a product
                                            </Typography>
                                        </React.Fragment>
                                    ) : chat?.lastMessage?.isOrder ? (
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                level="body-xs"
                                                sx={{
                                                    display: "inline",
                                                }}
                                            >
                                                sent an order
                                            </Typography>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                level="body-xs"
                                                sx={{
                                                    display: "inline",
                                                }}
                                            >
                                                {chat?.lastMessage?.message}
                                            </Typography>
                                        </React.Fragment>
                                    )
                                ) : (
                                    <Typography
                                        component="span"
                                        level="body-xs"
                                        sx={{
                                            display: "inline",
                                        }}
                                    >
                                        {"No messages yet"}
                                    </Typography>
                                )}
                            </Typography>
                        </Box>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </React.Fragment>
    );
}

export default ConversationItem;
