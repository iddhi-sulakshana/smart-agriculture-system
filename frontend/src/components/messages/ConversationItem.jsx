import { Box, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import React from "react";
import AvatarWithStatus from "./AvatarWithStatus";

function ConversationItem() {
    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    // onClick={() => {
                    //     setSelectedChat(_id);
                    // }}
                    // selected={isSelected}
                    color="neutral"
                    sx={{
                        flexDirection: "column",
                        alignItems: "initial",
                        gap: 1,
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        {/* Chat User Icon */}
                        <AvatarWithStatus
                            src="https://robohash.org/sd"
                            online="true"
                        />
                        <Box sx={{ flex: 1 }}>
                            {/* Display Chat User Name */}
                            <Typography level="title-sm">Samuel</Typography>
                            {/* Display the last message of the chat */}
                            <Typography
                                level="body-sm"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                No messages yet
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                lineHeight: 1.5,
                                textAlign: "right",
                            }}
                        >
                            {/* Display Sent Time */}
                            <Typography level="body-xs" display="block" noWrap>
                                just now
                            </Typography>
                        </Box>
                    </Stack>
                </ListItemButton>
            </ListItem>
        </React.Fragment>
    );
}

export default ConversationItem;
