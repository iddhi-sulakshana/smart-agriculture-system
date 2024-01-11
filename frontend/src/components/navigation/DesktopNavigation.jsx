import { Avatar, Button, IconButton, Stack } from "@mui/joy";
import React from "react";
import Links from "./Links";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function DesktopNavigation() {
    const { token } = UserContext();
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
            {Links.map(({ name, to, ...others }) => {
                console.log(others);
                // if the link is protected and the user is not logged in, don't show the link
                if (others?.logged && !token) return null;
                // if the link is not protected and the user is logged in, don't show the link
                if (others.nonLogged && token) return null;
                return (
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
                );
            })}
        </Stack>
    );
}

export default DesktopNavigation;
