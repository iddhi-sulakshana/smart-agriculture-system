import { Sheet, Typography } from "@mui/joy";
import React from "react";

function News() {
    return (
        <Sheet>
            {/* Title */}
            <Typography
                fontSize="lg"
                level="h1"
                fontWeight="lg"
                textAlign="center"
            >
                News
            </Typography>
        </Sheet>
    );
}

export default News;
