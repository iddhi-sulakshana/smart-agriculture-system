import { Sheet, Typography } from "@mui/joy";
import React from "react";

function seeds() {
    return (
        <Sheet>
            {/* Title */}
            <Typography
                fontSize="lg"
                level="h1"
                fontWeight="lg"
                textAlign="center"
                minHeight="65dvh"
            >
                Resource Center
            </Typography>
        </Sheet>
    );
}

export default seeds;
