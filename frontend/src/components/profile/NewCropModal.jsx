import {
    AspectRatio,
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Stack,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Upload } from "antd";

import { toast } from "react-toastify";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function NewCropModal({ open, setOpen, selected, setSelected }) {
    // form data
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState("kg");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [previewUrl, setPreviewUrl] = useState();
    useEffect(() => {
        if (open) {
            setPreviewUrl();
            setFile(null);
        }
    }, [open]);

    const beforeUpload = (file) => {
        setFile(null);
        setPreviewUrl(null);
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            toast.error("You can only upload JPG/PNG file!");
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast.error("Image must smaller than 2MB!");
            return false;
        }
        getBase64(file, (url) => {
            setPreviewUrl(url);
        });
        setFile(file);
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // form validation
        if (!file) return toast.error("Image is required");
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
    };
    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
                setSelected(null);
            }}
        >
            <ModalDialog variant="outlined">
                <ModalClose />
                <DialogTitle>Add new Crop</DialogTitle>
                <DialogContent>
                    Fill in the information for the crops.
                </DialogContent>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <FormControl>
                                <FormLabel>Image</FormLabel>
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                >
                                    {previewUrl ? (
                                        <AspectRatio
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            ratio={1}
                                        >
                                            <img
                                                src={previewUrl}
                                                alt="avatar"
                                            />
                                        </AspectRatio>
                                    ) : (
                                        <Button
                                            variant="plain"
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        >
                                            <Stack
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <AddIcon />
                                                Upload
                                            </Stack>
                                        </Button>
                                    )}
                                </Upload>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input autoFocus required />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Stack spacing={2} sx={{ p: 2 }}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input autoFocus required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input required />
                        </FormControl>
                        <Button type="submit">Submit</Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default NewCropModal;
