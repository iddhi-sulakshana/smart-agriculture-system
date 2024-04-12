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

function ResultModal({ open, setOpen, loading = true, prediction, error }) {
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
                    ) : error ? (
                        <>
                            <Typography level="h2">
                                Something went wrong! 🤯
                            </Typography>
                            <Typography level="title-lg" color="error">
                                {error}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography level="h2">
                                Best Crop to Harvest 🌾
                            </Typography>
                            <Typography level="title">
                                Based on the soil and weather conditions, we
                                recommend the following crop:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemDecorator>
                                        <ParkIcon color="success" />
                                    </ListItemDecorator>
                                    <ListItemContent>
                                        <Typography level="h3">
                                            {prediction}
                                        </Typography>
                                    </ListItemContent>
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
