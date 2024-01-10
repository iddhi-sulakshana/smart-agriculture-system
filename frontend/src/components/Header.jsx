import React, { useEffect, useState } from "react";
// Joy components
import {
    Avatar,
    Box,
    Button,
    Dropdown,
    IconButton,
    Input,
    Link,
    ListDivider,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    useColorScheme,
} from "@mui/joy";
// MUI icons
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
// Local components
import MobileNavigation from "./MobileNavigation";
import MobileBottom from "./Navigation/MobileBottom";

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
export default function Header() {
    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between",
            }}
        >
            {/* Mobile bottom nav */}
            <MobileBottom />
            {/* Desktop Navbar */}
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
                <Button
                    variant="plain"
                    color="neutral"
                    aria-pressed="true"
                    component="a"
                    href="/joy-ui/getting-started/templates/email/"
                    size="sm"
                    sx={{ alignSelf: "center" }}
                >
                    Email
                </Button>
                <Button
                    variant="plain"
                    color="neutral"
                    component="a"
                    href="/joy-ui/getting-started/templates/team/"
                    size="sm"
                    sx={{ alignSelf: "center" }}
                >
                    Team
                </Button>
                <Button
                    variant="plain"
                    color="neutral"
                    component="a"
                    href="/joy-ui/getting-started/templates/files/"
                    size="sm"
                    sx={{ alignSelf: "center" }}
                >
                    Files
                </Button>
            </Stack>
            <MobileNavigation />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    alignItems: "center",
                }}
            >
                <Input
                    size="sm"
                    variant="outlined"
                    placeholder="Search anything…"
                    startDecorator={<SearchRoundedIcon color="primary" />}
                    endDecorator={
                        <IconButton
                            variant="outlined"
                            color="neutral"
                            sx={{ bgcolor: "background.level1" }}
                        >
                            <Typography level="title-sm" textColor="text.icon">
                                ⌘ K
                            </Typography>
                        </IconButton>
                    }
                    sx={{
                        alignSelf: "center",
                        display: {
                            xs: "none",
                            sm: "flex",
                        },
                    }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{
                        display: { xs: "inline-flex", sm: "none" },
                        alignSelf: "center",
                    }}
                >
                    <SearchRoundedIcon />
                </IconButton>
                <Tooltip title="Menu" variant="outlined">
                    <IconButton variant="plain" color="neutral">
                        <MenuRoundedIcon />
                    </IconButton>
                </Tooltip>
                <ColorSchemeToggle />
                <Dropdown>
                    <MenuButton
                        variant="plain"
                        size="sm"
                        sx={{
                            maxWidth: "32px",
                            maxHeight: "32px",
                            borderRadius: "9999999px",
                        }}
                    >
                        <Avatar
                            src="https://i.pravatar.cc/40?img=2"
                            srcSet="https://i.pravatar.cc/80?img=2"
                            sx={{ maxWidth: "32px", maxHeight: "32px" }}
                        />
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
                        <MenuItem>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    src="https://i.pravatar.cc/40?img=2"
                                    srcSet="https://i.pravatar.cc/80?img=2"
                                    sx={{ borderRadius: "50%" }}
                                />
                                <Box sx={{ ml: 1.5 }}>
                                    <Typography
                                        level="title-sm"
                                        textColor="text.primary"
                                    >
                                        Rick Sanchez
                                    </Typography>
                                    <Typography
                                        level="body-xs"
                                        textColor="text.tertiary"
                                    >
                                        rick@email.com
                                    </Typography>
                                </Box>
                            </Box>
                        </MenuItem>
                        <ListDivider />
                        <MenuItem>
                            <HelpRoundedIcon />
                            Help
                        </MenuItem>
                        <MenuItem>
                            <SettingsRoundedIcon />
                            Settings
                        </MenuItem>
                        <ListDivider />
                        <MenuItem component="a" href="/blog/first-look-at-joy/">
                            First look at Joy UI
                            <OpenInNewRoundedIcon />
                        </MenuItem>
                        <MenuItem
                            component="a"
                            href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
                        >
                            Sourcecode
                            <OpenInNewRoundedIcon />
                        </MenuItem>
                        <ListDivider />
                        <MenuItem>
                            <LogoutRoundedIcon />
                            Log out
                        </MenuItem>
                    </Menu>
                </Dropdown>
            </Box>
        </Box>
    );
}
