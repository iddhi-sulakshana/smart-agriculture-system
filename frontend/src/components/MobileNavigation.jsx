import React, { useState } from "react";
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
    ListItemDecorator,
    ListSubheader,
    ModalClose,
} from "@mui/joy";
// MUI icons
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import AssistantPhotoRoundedIcon from "@mui/icons-material/AssistantPhotoRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

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
                                <ListItem>
                                    <ListItemButton selected>
                                        <ListItemDecorator>
                                            <InboxRoundedIcon fontSize="small" />
                                        </ListItemDecorator>
                                        <ListItemContent>Inbox</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemDecorator>
                                            <OutboxRoundedIcon fontSize="small" />
                                        </ListItemDecorator>
                                        <ListItemContent>Sent</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemDecorator>
                                            <DraftsRoundedIcon fontSize="small" />
                                        </ListItemDecorator>
                                        <ListItemContent>Draft</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemDecorator>
                                            <AssistantPhotoRoundedIcon fontSize="small" />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            Flagged
                                        </ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemDecorator>
                                            <DeleteRoundedIcon fontSize="small" />
                                        </ListItemDecorator>
                                        <ListItemContent>Trash</ListItemContent>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default MobileNavigation;
