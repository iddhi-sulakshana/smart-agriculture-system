import {
    AspectRatio,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardOverflow,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/joy";
import React from "react";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";

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
    const handleAdd = () => {};
    return (
        <Card>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography level="title-md">Change Password</Typography>
                <Button size="sm" variant="solid" onClick={handleAdd}>
                    Add New Item
                </Button>
            </Box>
            <Divider />
            <CardContent>
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    {data.map((item) => (
                        <ClickableCard
                            key={item.id}
                            loading={false}
                            {...item}
                        />
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}

function ClickableCard({
    loading = true,
    title,
    price,
    image,
    stock,
    unit = "kg",
    location,
}) {
    const onClick = () => {};
    return (
        <Grid
            onClick={onClick}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <Card
                orientation="vertical"
                variant="outlined"
                sx={(theme) => ({
                    transition: "0.4s",
                    minWidth: "14rem",
                    "&:hover": {
                        boxShadow: theme.shadow.xl,
                        transform: "scale(1.04)",
                    },
                })}
            >
                <CardOverflow>
                    <AspectRatio ratio={2 / 1}>
                        {loading ? (
                            <Skeleton>
                                <img src="" alt="loading" />
                            </Skeleton>
                        ) : (
                            <img src={image} loading="lazy" alt={title} />
                        )}
                    </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ textAlign: "center" }}>
                    {loading ? (
                        <Typography level="body-md" textAlign="center">
                            <Skeleton>Loading</Skeleton>
                        </Typography>
                    ) : (
                        <Typography
                            textAlign="center"
                            level="body-md"
                            fontWeight="lg"
                            textColor="primary.plainColor"
                        >
                            {title}
                        </Typography>
                    )}
                    {loading ? (
                        <Typography textAlign="center" level="body-md">
                            <Skeleton>Loading</Skeleton>
                        </Typography>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                textAlign="center"
                                level="body-md"
                                startDecorator="Rs."
                                endDecorator={`/${unit}`}
                            >
                                {Number(price).toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                    {loading ? (
                        <Typography textAlign="center" level="body-md">
                            <Skeleton>Loading</Skeleton>
                        </Typography>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                textAlign="center"
                                level="body-md"
                                endDecorator={`${unit}`}
                            >
                                {Number(stock).toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
                <CardOverflow>
                    {loading ? (
                        <Skeleton>Loading</Skeleton>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                            mb={1}
                        >
                            <Typography
                                textAlign="center"
                                level="body-sm"
                                startDecorator={<PlaceRoundedIcon />}
                            >
                                {location}
                            </Typography>
                        </Box>
                    )}
                </CardOverflow>
            </Card>
        </Grid>
    );
}

export default CropListingCard;
