import { Sheet, Typography } from "@mui/joy";
import React from "react";

function Main() {
    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
            }}
        >
            {/* Title */}
            <Typography
                fontSize="lg"
                level="h1"
                fontWeight="lg"
                textAlign="center"
            >
                Resource Center
            </Typography>
        </Sheet>
    );
}

export default Main;
