import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemContent,
    ListItemDecorator,
    Modal,
    ModalClose,
    ModalDialog,
    Typography,
} from "@mui/joy";
import React from "react";
import ParkIcon from "@mui/icons-material/Park";

function ResultModal({ open, setOpen, loading = true }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{ p: 2 }}>
                <ModalClose />
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    mt={3}
                    gap={2}
                >
                    {loading ? (
                        <>
                            <CircularProgress />
                            <Typography level="title-lg">
                                Getting the best seeds to harvest...
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography level="title-lg">
                                Best Crops for your provided data
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemDecorator>
                                        <ParkIcon color="success" />
                                    </ListItemDecorator>
                                    <ListItemContent>Wheat</ListItemContent>
                                </ListItem>
                                <ListItem>
                                    <ListItemDecorator>
                                        <ParkIcon color="success" />
                                    </ListItemDecorator>
                                    <ListItemContent>Rice</ListItemContent>
                                </ListItem>
                                <ListItem>
                                    <ListItemDecorator>
                                        <ParkIcon color="success" />
                                    </ListItemDecorator>
                                    <ListItemContent>Maize</ListItemContent>
                                </ListItem>
                            </List>
                        </>
                    )}
                </Box>
            </ModalDialog>
        </Modal>
    );
}

export default ResultModal;
