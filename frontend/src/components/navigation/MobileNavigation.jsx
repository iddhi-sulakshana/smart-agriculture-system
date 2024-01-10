import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Joy components
import {
    Box,
    DialogTitle,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    ListSubheader,
    ModalClose,
} from "@mui/joy";
// MUI icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// Local components
import Links from "./Links";

function MobileNavigation() {
    const [open, setOpen] = useState(false);
    return (
        <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            {/* Menu Icon Button */}
            <IconButton
                variant="plain"
                color="neutral"
                onClick={() => setOpen(true)}
            >
                <MenuRoundedIcon />
            </IconButton>
            {/* Side Drawer */}
            <Drawer
                sx={{ display: { xs: "inline-flex", sm: "none" } }}
                open={open}
                onClose={() => setOpen(false)}
            >
                <ModalClose />
                <DialogTitle>Online Marketplace</DialogTitle>
                <Box sx={{ px: 1 }}>
                    <List
                        size="sm"
                        sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}
                    >
                        <ListItem nested>
                            <ListSubheader
                                sx={{ letterSpacing: "2px", fontWeight: "800" }}
                            >
                                Menu
                            </ListSubheader>
                            <List aria-labelledby="nav-list-browse">
                                {/* Mobile Menu items */}
                                {Links.map(({ name, to }) => {
                                    return (
                                        <NavLink
                                            key={name}
                                            to={to}
                                            style={{ textDecoration: "none" }}
                                            onClick={() => setOpen(false)}
                                            children={({ isActive }) => {
                                                return (
                                                    <ListItem>
                                                        <ListItemButton
                                                            selected={isActive}
                                                        >
                                                            {/* <ListItemDecorator>
                                                                <InboxRoundedIcon fontSize="small" />
                                                            </ListItemDecorator> */}
                                                            <ListItemContent>
                                                                {name}
                                                            </ListItemContent>
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            }}
                                        />
                                    );
                                })}
                            </List>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default MobileNavigation;
