import { Avatar, Button, IconButton, Stack } from "@mui/joy";
import React from "react";
import Links from "./Links";
import { NavLink } from "react-router-dom";

function DesktopNavigation() {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ display: { xs: "none", sm: "flex" } }}
        >
            <IconButton
                size="md"
                variant="none"
                sx={{
                    display: { xs: "none", sm: "inline-flex" },
                }}
            >
                <Avatar src="/logo.png" color="none" />
            </IconButton>
            {/* Desktop Menu items */}
            {Links.map(({ name, to }) => (
                <NavLink
                    to={to}
                    key={name}
                    children={({ isActive }) => {
                        return (
                            <Button
                                variant="plain"
                                color="neutral"
                                aria-pressed={isActive}
                                size="sm"
                                sx={{
                                    alignSelf: "center",
                                }}
                            >
                                {name}
                            </Button>
                        );
                    }}
                />
            ))}
        </Stack>
    );
}

export default DesktopNavigation;
