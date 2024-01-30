import { Avatar, Box, Stack, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import React from "react";

function SectionList() {
    return (
        <Stack
            direction="row"
            spacing={1}
            mb={1}
            px={1}
            justifyContent={{ xs: "normal", md: "center" }}
            sx={{
                overflowX: "auto",
            }}
        >
            <ClickableAvatar
                src="/information/seeds.jpeg"
                name="Seeds"
                to="./seeds"
            />
            <ClickableAvatar
                src="/information/fertilizers.jpeg"
                name="Fertilizers"
                to="./ferilizers"
            />
            <ClickableAvatar
                src="/information/prices.jpeg"
                name="Prices"
                to="./prices"
            />
            <ClickableAvatar
                src="/information/regulations.jpeg"
                name="Regulations"
                to="./regulations"
            />
            <ClickableAvatar
                src="/information/storage.jpeg"
                name="Storage"
                to="./storage"
            />
        </Stack>
    );
}
function ClickableAvatar({ name, to, src }) {
    return (
        <Box
            component={Link}
            to={`./${to || ""}`}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                color: "text.primary",
            }}
        >
            <Avatar
                src={src}
                sx={{
                    width: { xs: 70, md: 80 },
                    height: { xs: 70, md: 80 },
                }}
                size="lg"
            />
            <Typography level="body-sm">{name || "???"}</Typography>
        </Box>
    );
}

export default SectionList;
