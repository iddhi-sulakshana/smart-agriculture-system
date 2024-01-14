import { Box } from "@mui/joy";
import React from "react";

function Chat() {
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
            Chat
        </Box>
    );
}

export default Chat;
