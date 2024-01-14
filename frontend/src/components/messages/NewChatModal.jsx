import {
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    ListItemDecorator,
    Modal,
    ModalClose,
    ModalDialog,
    Typography,
} from "@mui/joy";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

import React from "react";
import AvatarWithStatus from "./AvatarWithStatus";

function NewChatModal({ open, setOpen }) {
    const onClickUser = (id) => {
        setOpen(false);
    };
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog size="md">
                <ModalClose />
                <DialogTitle>New chat with user</DialogTitle>
                <DialogContent>
                    {/* {loading && <Typography>Loading users...</Typography>}
                    {error && <Typography>Error loading users...</Typography>} */}
                    {/* {!loading && !error && users.length === 0 && (
                        <Typography>No users found...</Typography>
                    )} */}
                    <List>
                        {/* {!loading &&
                            !error &&
                            users.length !== 0 &&
                            users.map((user) => ( */}
                        <ListItem>
                            <ListItemButton onClick={() => onClickUser(1)}>
                                <ListItemDecorator sx={{ pr: 2 }}>
                                    <AvatarWithStatus />
                                </ListItemDecorator>
                                <ListItemContent>Someone</ListItemContent>
                                <KeyboardArrowRightRoundedIcon />
                            </ListItemButton>
                        </ListItem>
                        {/* ))} */}
                    </List>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}

export default NewChatModal;
