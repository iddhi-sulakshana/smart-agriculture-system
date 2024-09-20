import {
    AspectRatio,
    Box,
    Divider,
    Grid,
    Sheet,
    Stack,
    Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaypalComponent from "../components/payment/PaypalComponent";
import { toast } from "react-toastify";
import axios from "axios";
import { getURL } from "../Utils/Url";
import UserContext from "../contexts/UserContext";

const Payment = () => {
    const { state } = useLocation();
    const { token } = UserContext();

    const [isPaid, setIsPaid] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();
    if (state !== undefined && state !== null) {
        var { product, address, name, paymentMethod, phone, quantity, total } =
            state;
    }

    useEffect(() => {
        if (isPaid) {
            toast.success("Payment successful, processing...");
            // Create order message
            axios
                .request({
                    method: "POST",
                    url: getURL("payment/order"),
                    headers: {
                        "x-auth-token": token,
                    },
                    data: {
                        paymentId: orderId,
                        cropId: product._id,
                        seller: product.user._id,
                        shippingDetails: {
                            address: address,
                            phone: phone,
                            name: name,
                        },
                        quantity: quantity,
                        total: total,
                        method: paymentMethod,
                        isPaid: isPaid,
                    },
                })
                .then((response) => {
                    toast.success(
                        "Order message sent successfully to the seller, redirecting..."
                    );
                    setTimeout(() => {
                        // navigate("/messages");
                    }, 1000);
                })
                .catch((error) => {
                    toast.error(
                        "Payment Suceess but order creation failed please contact us immediately"
                    );
                });
        }
    }, [isPaid]);
    useEffect(() => {
        if (state === undefined || state === null) {
            navigate("/market");
        }
    }, []);
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
            <Grid container justifyContent="center" alignItems="center">
                <Grid
                    display={{ xs: "none", md: "block" }}
                    md={6}
                    sx={{
                        flexGrow: 1,
                        px: {
                            xs: 0,
                            md: 10,
                        },
                    }}
                >
                    <AspectRatio ratio={1}>
                        <img src="/checkout_cover.png" alt="product" />
                    </AspectRatio>
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    sx={{
                        pt: {
                            xs: 0,
                            md: 5,
                        },
                        letterSpacing: "0.1rem",
                        wordSpacing: "0.1rem",
                    }}
                >
                    <Stack spacing={2}>
                        <Sheet sx={{ p: 2 }} variant="outlined">
                            <Stack>
                                <Typography level="h4" color="primary" mb={1}>
                                    Payment
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        level="title-md"
                                        endDecorator=" "
                                    >
                                        Item:
                                    </Typography>
                                    <Typography level="body-md">
                                        {product.title}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        level="title-md"
                                        endDecorator=" "
                                    >
                                        Quantity:
                                    </Typography>
                                    <Typography
                                        level="body-md"
                                        endDecorator={product.unit}
                                    >
                                        {quantity}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        level="title-md"
                                        endDecorator=" "
                                    >
                                        Total:
                                    </Typography>
                                    <Typography
                                        level="body-md"
                                        startDecorator="Rs. "
                                    >
                                        {total}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        level="title-md"
                                        endDecorator=" "
                                    >
                                        Name:
                                    </Typography>
                                    <Typography level="body-md">
                                        {name}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        level="title-md"
                                        endDecorator=" "
                                    >
                                        Phone:
                                    </Typography>
                                    <Typography level="body-md">
                                        {phone}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Typography
                                        level="title-md"
                                        endDecorator=" "
                                    >
                                        Address:
                                    </Typography>
                                    <Typography level="body-md">
                                        {address}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                {paymentMethod === "paypal" ? (
                                    <PaypalComponent
                                        product={product}
                                        total={total}
                                        name={name}
                                        isPaid={isPaid}
                                        setIsPaid={setIsPaid}
                                        orderId={orderId}
                                        setOrderId={setOrderId}
                                    />
                                ) : (
                                    <Typography level="body-md">
                                        Payment method not supported
                                    </Typography>
                                )}
                            </Stack>
                        </Sheet>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Payment;
