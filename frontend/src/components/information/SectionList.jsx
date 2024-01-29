import { Avatar, Box } from "@mui/joy";
import React from "react";

function SectionList() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mb: 1,
            }}
        >
            <Avatar src="/information/seeds.jpeg" alt="Seeds" />
            <Avatar />
        </Box>
    );
}

export default SectionList;
