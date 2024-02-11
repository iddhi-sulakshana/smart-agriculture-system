import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/joy";
import React, { useState } from "react";
import CropClickableCard from "./CropClickableCard";
import NewCropModal from "./NewCropModal";
import AddIcon from "@mui/icons-material/Add";
import useGetFarmersCrops from "../../hooks/useGetFarmersCrops";

const data = [
    {
        id: 1,
        title: "Apple 1kg",
        stock: 100,
        price: 1800,
        unit: "kg",
        location: "Jaffna",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
        image: "https://themewagon.github.io/vegefoods/images/product-1.jpg",
    },
    {
        id: 2,
        title: "Strawberry",
        stock: 20,
        price: 2000,
        unit: "t",
        location: "Kandy",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
        image: "https://themewagon.github.io/vegefoods/images/product-2.jpg",
    },
    {
        id: 3,
        title: "Tomato",
        stock: 500,
        price: 1200,
        unit: "kg",
        location: "Galle",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
        image: "https://themewagon.github.io/vegefoods/images/product-3.jpg",
    },
    {
        id: 4,
        title: "Carrot",
        price: 800,
        image: "https://themewagon.github.io/vegefoods/images/product-4.jpg",
        stock: 500,
        unit: "kg",
        location: "Anuradhapura",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
    {
        id: 5,
        title: "Broccoli",
        price: 1500,
        image: "https://themewagon.github.io/vegefoods/images/product-5.jpg",
        stock: 500,
        unit: "kg",
        location: "Jaffna",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
    {
        id: 6,
        title: "Cucumber",
        price: 900,
        image: "https://themewagon.github.io/vegefoods/images/product-6.jpg",
        stock: 500,
        unit: "kg",
        location: "Colombo",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
    {
        id: 7,
        title: "Apple",
        price: 1800,
        image: "https://themewagon.github.io/vegefoods/images/product-7.jpg",
        stock: 500,
        unit: "kg",
        location: "Kandy",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
    {
        id: 8,
        title: "Orange",
        price: 1600,
        image: "https://themewagon.github.io/vegefoods/images/product-8.jpg",
        stock: 500,
        unit: "kg",
        location: "Galle",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
    {
        id: 9,
        title: "Lettuce",
        price: 1100,
        image: "https://themewagon.github.io/vegefoods/images/product-9.jpg",
        stock: 500,
        unit: "kg",
        location: "Anuradhapura",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
    {
        id: 10,
        title: "Grapes",
        price: 2200,
        image: "https://themewagon.github.io/vegefoods/images/product-10.jpg",
        stock: 500,
        unit: "kg",
        location: "Jaffna",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus accusantium laboriosam nemo vel. At nam provident dolor qui ipsa consectetur vitae architecto assumenda corrupti rem aliquam, voluptatibus excepturi alias? Quam consequatur id in voluptate, non harum, itaque dolor, corporis repellendus veritatis atque commodi quia esse impedit veniam dolorem rerum ducimus provident suscipit accusamus eum repellat molestias? Quas, deleniti rerum.",
    },
];

function CropListingCard() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const { crops, loading, error } = useGetFarmersCrops(refresh);
    const handleAdd = (select) => {
        setSelected(select || null);
        setOpen(true);
    };
    return (
        <Card>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography level="title-md">Crop Listing</Typography>
                <Button
                    endDecorator={<AddIcon />}
                    size="sm"
                    variant="solid"
                    onClick={() => handleAdd()}
                >
                    Add New Item
                </Button>
            </Box>
            <Divider />
            <CardContent>
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    {loading && <Typography>Loading...</Typography>}
                    {error && <Typography>{error.message}</Typography>}
                    {!loading && !error && crops.length === 0 && (
                        <Typography>No crops listed yet</Typography>
                    )}
                    {!loading &&
                        !error &&
                        crops.length > 0 &&
                        crops.map((crop, index) => (
                            <Grid xs={12} sm={6} md={4} key={index}>
                                <CropClickableCard
                                    loading={loading}
                                    title={crop.title}
                                    price={crop.price}
                                    image={crop.image}
                                    stock={crop.stock}
                                    unit={crop.unit}
                                    location={crop.location}
                                />
                            </Grid>
                        ))}
                </Grid>
            </CardContent>
            <NewCropModal
                open={open}
                setOpen={setOpen}
                selected={selected}
                setSelected={setSelected}
                refresh={refresh}
                setRefresh={setRefresh}
            />
        </Card>
    );
}

export default CropListingCard;
