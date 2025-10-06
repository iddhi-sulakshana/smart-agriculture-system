import { AspectRatio, Avatar, Button, IconButton, Stack } from "@mui/joy";
import React from "react";
import Links from "./Links";
import { Link, NavLink } from "react-router-dom";
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
            data-tour="navigation"
        >
            <Link
                to="/"
                sx={{
                    display: { xs: "none", sm: "inline-flex" },
                }}
                data-tour="logo"
            >
                <AspectRatio
                    ratio={3 / 1}
                    objectFit="contain"
                    sx={{
                        width: 150,
                        mr: 3,
                    }}
                    variant="plain"
                >
                    <img src="/logo.png" />
                </AspectRatio>
            </Link>
            {/* Desktop Menu items */}
            {Links.map(({ name, to, ...others }) => {
                // if the link is protected and the user is not logged in, don't show the link
                if (others?.logged && !token) return null;
                // if the link is not protected and the user is logged in, don't show the link
                if (others.nonLogged && token) return null;
                
                // Map specific links to tour targets
                const getTourTarget = (name) => {
                    switch (name) {
                        case 'Crop Recommendation': return 'crop-recommendation';
                        case 'Market': return 'marketplace';
                        case 'Messages': return 'chat';
                        case 'Profile': return 'profile';
                        default: return null;
                    }
                };
                
                const tourTarget = getTourTarget(name);
                
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
                                    {...(tourTarget && { 'data-tour': tourTarget })}
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
