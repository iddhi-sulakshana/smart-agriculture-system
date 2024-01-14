import { Button, Chip, Stack, Typography } from "@mui/joy";
import React from "react";
import AvatarWithStatus from "./AvatarWithStatus";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function ChatHeader({ setSelectedChat }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.body",
            }}
            p={2}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                {/* Display User Picture */}
                <AvatarWithStatus
                    size="md"
                    src="https://robohash.org/123"
                    online={false}
                />
                <Typography
                    fontWeight="lg"
                    fontSize="lg"
                    component="h2"
                    noWrap
                    endDecorator={
                        <Chip
                            variant="outlined"
                            size="sm"
                            color="neutral"
                            sx={{
                                borderRadius: "sm",
                            }}
                            startDecorator={
                                <CircleIcon
                                    sx={{ fontSize: 8 }}
                                    color="success"
                                />
                            }
                        >
                            Admin
                        </Chip>
                    }
                >
                    Someone
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="plain"
                    color="danger"
                    size="sm"
                    // onClick
                >
                    <DeleteOutlineRoundedIcon />
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setSelectedChat(false);
                    }}
                >
                    <CloseRoundedIcon />
                </Button>
            </Stack>
        </Stack>
    );
}

export default ChatHeader;
