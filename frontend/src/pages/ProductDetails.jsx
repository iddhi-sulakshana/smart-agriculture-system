import { AspectRatio, Box, Button, Grid, Skeleton, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomAvatar from "../components/common/CustomAvatar";
import useGetCropViewDetails from "../hooks/useGetCropViewDetails";
import { getRootURL, getURL } from "../Utils/Url";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function ProductDetails() {
    const { id } = useParams();
    const { token } = UserContext();

    const product = useGetCropViewDetails(id);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if (product) {
            let percentageN;
            if (product.category.predictedPrice === 0) {
                if (product.category.weekPrice === 0) {
                    // Handle the case where both actual and predicted prices are zero
                    percentageN = 0;
                } else {
                    // Handle the case where the predicted price is zero but the actual price is not
                    percentageN = 0; // or any other value you deem appropriate
                }
            } else {
                percentageN = Math.abs(
                    ((product.category.weekPrice -
                        product.category.predictedPrice) /
                        product.category.predictedPrice) *
                        100
                ).toFixed(0);
            }
            setPercentage(percentageN);
        }
    }, [product]);

    const handleChat = () => {
        setLoading(true);
        axios
            .request({
                method: "POST",
                headers: {
                    "x-auth-token": token,
                },
                url: getURL("chat"),
                data: {
                    crop: product._id,
                    receiver: product.user._id,
                },
            })
            .then((res) => {
                navigate(`/messages/${res.data}`);
            })
            .catch((error) => {
                toast.error(
                    error.response.data
                        ? error.response.data
                        : "An error occurred"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

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
                        <Skeleton loading={!product} variant="rectangular">
                            <img
                                src={
                                    product &&
                                    getRootURL(`crops/${product?.image}`)
                                }
                                alt="product"
                            />
                        </Skeleton>
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
                        <Skeleton loading={!product} variant="text">
                            {product?.title}
                        </Skeleton>
                    </Typography>
                    <Typography
                        level="h2"
                        startDecorator="Rs."
                        endDecorator={`/${product?.unit}`}
                    >
                        <Skeleton loading={!product} variant="text">
                            {product?.price}
                        </Skeleton>
                    </Typography>
                    <Typography level="body-md">
                        <Skeleton loading={!product} variant="text">
                            <strong>{`${product?.stock}${product?.unit}'s`}</strong>{" "}
                            available
                        </Skeleton>
                    </Typography>

                    <Typography level="body-md">
                        <Skeleton loading={!product} variant="text">
                            <span style={{ color: "green" }}>In stock</span> at{" "}
                            {product?.location}
                        </Skeleton>
                    </Typography>

                    <Typography level="body-md" textAlign="justify" my={2}>
                        <Skeleton loading={!product} variant="text">
                            {product?.description}
                        </Skeleton>
                    </Typography>
                    <CustomAvatar src={product?.user.avatar} />
                    <Typography level="body-md" mt={1}>
                        <Skeleton loading={!product} variant="text">
                            {product?.user.name} ({product?.user.role})
                        </Skeleton>
                    </Typography>
                    {product && product.user.phone && (
                        <Typography
                            level="body-md"
                            mt={1}
                            startDecorator={<span>📞</span>}
                        >
                            {product.user.phone}
                        </Typography>
                    )}
                    {product && product.user.email && (
                        <Typography
                            level="body-md"
                            mt={1}
                            startDecorator={<span>✉️</span>}
                        >
                            {product.user.email}
                        </Typography>
                    )}
                    {product && product.user.address && (
                        <Typography
                            level="body-md"
                            mt={1}
                            startDecorator={<span>📍</span>}
                        >
                            {product.user.address}
                        </Typography>
                    )}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            my: 2,
                            gap: 2,
                        }}
                    >
                        {token ? (
                            <Button
                                variant="outlined"
                                onClick={handleChat}
                                loading={loading}
                            >
                                Chat now
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                Login to Chat
                            </Button>
                        )}
                        <Button variant="solid" disabled>
                            Buy now
                        </Button>
                    </Box>
                    <Typography
                        level="body-md"
                        startDecorator="Price fluctuation: "
                        endDecorator=" from last week"
                    >
                        <span
                            style={{
                                color:
                                    product?.category.weekPrice <
                                    product?.category.predictedPrice
                                        ? "green"
                                        : "red",
                            }}
                        >
                            {percentage}%{" "}
                            {product?.category.weekPrice <
                            product?.category.predictedPrice
                                ? "up"
                                : "down"}
                        </span>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductDetails;
