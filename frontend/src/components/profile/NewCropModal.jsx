import {
    AspectRatio,
    Box,
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
    Option,
    Radio,
    Select,
    Stack,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Upload } from "antd";

import { toast } from "react-toastify";
import useLocations from "../../hooks/useLocations";
import axios from "axios";
import { getURL } from "../../Utils/Url";
import UserContext from "../../contexts/UserContext";
import useGetCategory from "../../hooks/useGetCategory";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function NewCropModal({
    open,
    setOpen,
    selected,
    setSelected,
    refresh,
    setRefresh,
}) {
    const { token } = UserContext();
    const categoryData = useGetCategory();
    // get location data
    const locationData = useLocations();

    // form data
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [unit, setUnit] = useState("kg");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

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
        if (!title) return toast.error("Title is required");
        if (!stock) return toast.error("Stock is required");
        if (!price) return toast.error("Price is required");
        if (!location) return toast.error("Location is required");
        if (!description) return toast.error("Description is required");
        if (!category) return toast.error("Category is required");

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("stock", stock);
        formData.append("price", price);
        formData.append("unit", unit);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("category", category);

        axios
            .request({
                method: "POST",
                url: getURL("crops"),
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": token,
                },
            })
            .then((res) => {
                setOpen(false);
                setSelected(null);
                toast.success("Crop added successfully");
                // clear the form
                setFile(null);
                setPreviewUrl(null);
                setTitle("");
                setStock(0);
                setPrice(0);
                setUnit("kg");
                setLocation("");
                setDescription("");
                setCategory("");
                // refresh the crops list
                setRefresh(!refresh);
            })
            .catch((err) => {
                toast.error(err.response.data || "An error occurred");
            });

        // TODO: update the crops list
        // TODO: close the modal and clear the form
    };
    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
                setSelected(null);
            }}
        >
            <ModalDialog
                variant="outlined"
                layout="center"
                sx={{
                    overflowY: "scroll",
                }}
            >
                <ModalClose />
                <DialogTitle>Add new Crop</DialogTitle>
                <DialogContent>
                    Fill in the information for the crops.
                </DialogContent>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={6}>
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
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    name="title"
                                    autoFocus
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    name="category"
                                    placeholder="Select category"
                                    defaultValue=""
                                    onChange={(e, newVal) => {
                                        setCategory(newVal);
                                    }}
                                    value={category}
                                >
                                    {categoryData ? (
                                        categoryData.map((cat) => (
                                            <Option
                                                key={cat._id}
                                                value={cat._id}
                                            >
                                                {cat.name}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option value="">No categories</Option>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Stock</FormLabel>
                                <Input
                                    name="stock"
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    name="price"
                                    slotProps={{ input: { min: 0 } }}
                                    type="number"
                                    value={price}
                                    onChange={(e) => {
                                        if (
                                            e.target.value &&
                                            e.target.value < 0
                                        )
                                            return;
                                        // check if the price has more than two decimals and limit it to two
                                        if (
                                            e.target.value.includes(".") &&
                                            e.target.value.split(".")[1]
                                                ?.length > 2
                                        )
                                            e.target.value = Number(
                                                e.target.value
                                            ).toFixed(2);
                                        setPrice(e.target.value);
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormLabel>Unit</FormLabel>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Radio
                                    name="unit"
                                    checked={unit === "kg"}
                                    value="kg"
                                    onChange={(e) => {
                                        setUnit(e.target.value);
                                    }}
                                    label="Kilograms"
                                />
                                <Radio
                                    name="unit"
                                    checked={unit === "t"}
                                    value="t"
                                    onChange={(e) => {
                                        setUnit(e.target.value);
                                    }}
                                    label="Tonnes"
                                />
                            </Box>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <FormControl>
                                <FormLabel>Location</FormLabel>
                                <Select
                                    name="location"
                                    placeholder="Select location"
                                    defaultValue=""
                                    onChange={(e, newVal) => {
                                        setLocation(newVal);
                                    }}
                                    value={location}
                                >
                                    {locationData.map((loc) => (
                                        <Option key={loc} value={loc}>
                                            {loc}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12}>
                            <Button type="submit" sx={{ width: "100%" }}>
                                Add Crop
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default NewCropModal;
