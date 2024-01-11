import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Joy components
import {
    Avatar,
    Box,
    Dropdown,
    IconButton,
    Input,
    ListDivider,
    Menu,
    MenuButton,
    MenuItem,
    Skeleton,
    Tooltip,
    Typography,
    useColorScheme,
} from "@mui/joy";
// MUI icons
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Contexts
import UserContext from "../../contexts/UserContext";
import SnackBarContext from "../../contexts/SnackBarContext";
// Hooks
import useUserDetails from "../../hooks/useUserDetails";

function CommonNavigation() {
    const { token, setToken } = UserContext();
    const navigate = useNavigate();
    const { showMessage } = SnackBarContext();
    const { userDetails, loading, error } = useUserDetails();
    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        showMessage("success", "Sign out successful");
        navigate("/signin");
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
                alignItems: "center",
            }}
        >
            <ColorSchemeToggle />
            {token && (
                <Dropdown>
                    <MenuButton
                        variant="plain"
                        size="sm"
                        sx={{
                            maxWidth: "32px",
                            maxHeight: "32px",
                            borderRadius: "100%",
                        }}
                    >
                        <Avatar
                            src={!loading ? userDetails?.avatar : ""}
                            srcSet={!loading ? userDetails?.avatar : ""}
                            sx={{ maxWidth: "32px", maxHeight: "32px" }}
                        >
                            <Skeleton loading={loading} />
                        </Avatar>
                    </MenuButton>
                    <Menu
                        placement="bottom-end"
                        size="sm"
                        sx={{
                            zIndex: "99999",
                            p: 1,
                            gap: 1,
                            "--ListItem-radius": "var(--joy-radius-sm)",
                        }}
                    >
                        <MenuItem component={Link} to="/profile">
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    src={!loading ? userDetails?.avatar : ""}
                                    srcSet={!loading ? userDetails?.avatar : ""}
                                    sx={{ maxWidth: "32px", maxHeight: "32px" }}
                                >
                                    <Skeleton loading={loading} />
                                </Avatar>
                                <Box sx={{ ml: 1.5 }}>
                                    <Typography
                                        level="title-sm"
                                        textColor="text.primary"
                                    >
                                        <Skeleton
                                            loading={loading}
                                            variant="text"
                                            level="title-sm"
                                            width={100}
                                        >
                                            {!loading && userDetails?.name}
                                        </Skeleton>
                                    </Typography>
                                    <Typography
                                        level="body-xs"
                                        textColor="text.tertiary"
                                    >
                                        <Skeleton
                                            loading={loading}
                                            variant="text"
                                            level="body-xs"
                                            width={100}
                                        >
                                            {!loading && userDetails?.email}
                                        </Skeleton>
                                    </Typography>
                                </Box>
                            </Box>
                        </MenuItem>
                        <ListDivider />
                        <MenuItem component={Link} to="/profile">
                            <AccountCircleIcon />
                            Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/help">
                            <HelpRoundedIcon />
                            Help
                        </MenuItem>
                        <MenuItem component={Link} to="/settings">
                            <SettingsRoundedIcon />
                            Settings
                        </MenuItem>
                        <ListDivider />
                        <MenuItem component="a" target="_" href="#">
                            LINK 1
                            <OpenInNewRoundedIcon />
                        </MenuItem>
                        <MenuItem component="a" target="_" href="#">
                            LINK 2
                            <OpenInNewRoundedIcon />
                        </MenuItem>
                        <ListDivider />
                        <MenuItem onClick={handleLogout}>
                            <LogoutRoundedIcon />
                            Log out
                        </MenuItem>
                    </Menu>
                </Dropdown>
            )}
        </Box>
    );
}

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="primary" />;
    }
    return (
        <Tooltip title="Change theme" variant="outlined">
            <IconButton
                id="toggle-mode"
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ alignSelf: "center" }}
                onClick={() => {
                    if (mode === "light") {
                        setMode("dark");
                    } else {
                        setMode("light");
                    }
                }}
            >
                {mode === "light" ? (
                    <DarkModeRoundedIcon />
                ) : (
                    <LightModeRoundedIcon />
                )}
            </IconButton>
        </Tooltip>
    );
}
export default CommonNavigation;