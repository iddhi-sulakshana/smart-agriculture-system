import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Joy components
import {
    Box,
    Dropdown,
    IconButton,
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
// Hooks
import useUserDetails from "../../hooks/useUserDetails";
import { toast } from "react-toastify";
import CustomAvatar from "../common/CustomAvatar";

function CommonNavigation() {
    const { token, setToken } = UserContext();
    const navigate = useNavigate();
    const { userDetails, loading, error } = useUserDetails();
    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        toast.success("Sign out successful");
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
            <LanguageToggle />
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
                        <CustomAvatar
                            src={!loading ? userDetails?.avatar : ""}
                            srcSet={!loading ? userDetails?.avatar : ""}
                            sx={{ maxWidth: "32px", maxHeight: "32px" }}
                        >
                            <Skeleton loading={loading} />
                        </CustomAvatar>
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
                                <CustomAvatar
                                    src={!loading ? userDetails?.avatar : ""}
                                    srcSet={!loading ? userDetails?.avatar : ""}
                                    sx={{ maxWidth: "32px", maxHeight: "32px" }}
                                >
                                    <Skeleton loading={loading} />
                                </CustomAvatar>
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
function LanguageToggle() {
    const [language, setLanguage] = useState("en");
    const toggleLanguage = () => {
        if (language === "en") {
            setLanguage("si");
            // wait for 5 sec and then change back to default
            setTimeout(() => {
                setLanguage("en");
                toast.warn("Sinhala Language still in under construction");
            }, 1000);
        } else {
            setLanguage("en");
        }
    };
    useEffect(() => {
        const lang = sessionStorage.getItem("language");
        console.log(lang);
        if (lang) {
            setLanguage(lang);
        }
    }, []);
    return (
        <Tooltip title="Change language" variant="outlined">
            <IconButton
                id="toggle-language"
                size="sm"
                variant="plain"
                color="neutral"
                sx={{ alignSelf: "center" }}
                onClick={toggleLanguage}
            >
                {language === "en" ? "En" : "සිං"}
            </IconButton>
        </Tooltip>
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
