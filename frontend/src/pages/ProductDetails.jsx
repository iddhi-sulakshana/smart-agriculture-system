import { AspectRatio, Box, Button, Grid, Typography } from "@mui/joy";
import React from "react";
import { useParams } from "react-router-dom";
import CustomAvatar from "../components/common/CustomAvatar";

function ProductDetails() {
    const { id } = useParams();

    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Grid container justifyContent="center">
                <Grid
                    xs={12}
                    md={6}
                    sx={{
                        flexGrow: 2,
                        px: {
                            xs: 0,
                            md: 10,
                        },
                    }}
                >
                    <AspectRatio ratio={1}>
                        <img
                            src={`https://themewagon.github.io/vegefoods/images/product-${
                                Number(id) + 1
                            }.jpg`}
                            alt="product"
                        />
                    </AspectRatio>
                </Grid>

                <Grid
                    xs={12}
                    md={6}
                    sx={{
                        flexGrow: 1,
                        pt: {
                            xs: 0,
                            md: 5,
                        },
                        letterSpacing: "0.1rem",
                        wordSpacing: "0.1rem",
                    }}
                >
                    <Typography level="h1" color="primary">
                        Apple
                    </Typography>
                    <Typography
                        level="h2"
                        startDecorator="Rs."
                        endDecorator="/kg"
                    >
                        1800
                    </Typography>
                    <Typography level="body-md">
                        <strong>100kg</strong> available
                    </Typography>

                    <Typography level="body-md">
                        <span style={{ color: "green" }}>In stock</span> at
                        Jaffna
                    </Typography>

                    <Typography level="body-md" textAlign="justify" my={2}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolorum minus accusantium laboriosam nemo vel. At nam
                        provident dolor qui ipsa consectetur vitae architecto
                        assumenda corrupti rem aliquam, voluptatibus excepturi
                        alias? Quam consequatur id in voluptate, non harum,
                        itaque dolor, corporis repellendus veritatis atque
                        commodi quia esse impedit veniam dolorem rerum ducimus
                        provident suscipit accusamus eum repellat molestias?
                        Quas, deleniti rerum.
                    </Typography>
                    <CustomAvatar />
                    <Typography level="body-md" mt={1}>
                        John Doe
                    </Typography>
                    <Typography
                        level="body-md"
                        mt={1}
                        startDecorator={
                            <span style={{ color: "green" }}>@</span>
                        }
                    >
                        0771234567
                    </Typography>
                    <Typography
                        level="body-md"
                        mt={1}
                        startDecorator={<span style={{ color: "red" }}>#</span>}
                    >
                        No. 123, Galle Road, Colombo
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            my: 2,
                            gap: 2,
                        }}
                    >
                        <Button variant="outlined">Chat now</Button>
                        <Button variant="solid" disabled>
                            Buy now
                        </Button>
                    </Box>
                    <Typography
                        level="body-md"
                        startDecorator="Price fluctuation: "
                        endDecorator=" from last week"
                    >
                        <span style={{ color: "green" }}>50% up</span>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductDetails;
