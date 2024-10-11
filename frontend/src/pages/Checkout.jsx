import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Radio,
    Sheet,
    Stack,
    Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentsIcon from "@mui/icons-material/Payments";
import { toast } from "react-toastify";

const Checkout = () => {
    const style = "outlined";
    const navigate = useNavigate();
    const { state } = useLocation();
    if (state !== undefined && state !== null) {
        var { product, quantity, subtotal } = state;
    }
    const fee = (subtotal * 0.05).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(fee)).toFixed(2);
    const [checked, setChecked] = useState(true);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("paypal");

    const { userDetails, loading, error } = useUserDetails();

    useEffect(() => {
        if (state === undefined || state === null) {
            navigate("/market");
        }
    }, []);

    useEffect(() => {
        if (loading || error) {
            return;
        }
        if (checked && userDetails) {
            setName(userDetails.name);
            setPhone(userDetails.phone);
            setAddress(userDetails.address);
            setEmail(userDetails.email);
        }
        if (checked && userDetails) {
            if (
                userDetails.name === "" ||
                userDetails.phone === "" ||
                userDetails.address === "" ||
                userDetails.email === ""
            ) {
                setChecked(false);
            }
        }
    }, [checked, userDetails, loading, error]);
    useEffect(() => {
        if (loading || error) {
            return;
        }
        if (userDetails) {
            setName(userDetails.name);
            setPhone(userDetails.phone);
            setAddress(userDetails.address);
        }
    }, [userDetails, loading, error]);

    const buttonAction = () => {
        if (paymentMethod === "") {
            return toast.error("Please select a payment method");
        }
        if (
            name === "" ||
            phone === "" ||
            address === "" ||
            email === "" ||
            city === "" ||
            postal === ""
        ) {
            return toast.error("Please fill all the details");
        }

        navigate("/payment", {
            state: {
                product: product,
                quantity: quantity,
                total: total,
                name: name,
                phone: phone,
                address: address,
                paymentMethod: paymentMethod,
                email: email,
                city: city,
                postal: postal,
            },
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
            <Typography level="h3" color="primary" textAlign="center">
                Checkout
            </Typography>
            <Grid container justifyContent="center" mt={2}>
                <Grid
                    xs={12}
                    md={7}
                    sx={{
                        flexGrow: 2,
                        px: {
                            xs: 0,
                            md: 2,
                        },
                    }}
                >
                    <Stack spacing={2}>
                        <Sheet sx={{ p: 2 }} variant={style}>
                            <Typography level="h4" color="primary">
                                {product?.title}
                            </Typography>
                            <Typography level="body-md" color="neutral">
                                {product?.location}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    level="h4"
                                    startDecorator="Rs."
                                    endDecorator={`/${product?.unit}`}
                                >
                                    {product?.price}
                                </Typography>
                                <Typography
                                    level="body-md"
                                    color="neutral"
                                    startDecorator="x"
                                    endDecorator={product?.unit}
                                >
                                    {quantity}
                                </Typography>
                            </Box>
                        </Sheet>
                        <Sheet sx={{ p: 2 }} variant={style}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <Typography level="h4" color="primary">
                                    Shipping Details
                                </Typography>
                                <Checkbox
                                    color="primary"
                                    label="Use default details"
                                    size="sm"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                            </Box>
                            {
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        gap: 1,
                                        mt: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 2,
                                        }}
                                    >
                                        <FormControl sx={{ width: "100%" }}>
                                            <FormLabel>Name</FormLabel>
                                            <Input
                                                placeholder="Name"
                                                size="sm"
                                                fullWidth
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </FormControl>

                                        <FormControl sx={{ width: "100%" }}>
                                            <FormLabel>Phone</FormLabel>
                                            <Input
                                                placeholder="Phone"
                                                size="sm"
                                                fullWidth
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                    <FormControl sx={{ width: "100%" }}>
                                        <FormLabel>Address</FormLabel>
                                        <Input
                                            placeholder="Address"
                                            size="sm"
                                            fullWidth
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                    <FormControl sx={{ width: "100%" }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="Email"
                                            size="sm"
                                            fullWidth
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 2,
                                        }}
                                    >
                                        <FormControl sx={{ width: "100%" }}>
                                            <FormLabel>City</FormLabel>
                                            <Input
                                                placeholder="City"
                                                size="sm"
                                                fullWidth
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                        <FormControl sx={{ width: "100%" }}>
                                            <FormLabel>Postal</FormLabel>
                                            <Input
                                                placeholder="Postal Code"
                                                size="sm"
                                                fullWidth
                                                value={postal}
                                                onChange={(e) =>
                                                    setPostal(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                </Box>
                            }
                        </Sheet>
                        <Sheet sx={{ p: 2 }} variant={style}>
                            <Typography level="h4" color="primary">
                                Payment Method
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: 5,
                                    mt: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Radio
                                        color="primary"
                                        label="PayHere"
                                        size="sm"
                                        value="bank"
                                        checked={paymentMethod === "payhere"}
                                        onChange={() =>
                                            setPaymentMethod("payhere")
                                        }
                                    />
                                    <PaymentsIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Radio
                                        color="primary"
                                        label="Direct Bank Transfer"
                                        size="sm"
                                        value="bank"
                                        checked={paymentMethod === "bank"}
                                        onChange={() =>
                                            setPaymentMethod("bank")
                                        }
                                    />
                                    <AccountBalanceIcon />
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Radio
                                        color="primary"
                                        label="Paypal"
                                        size="sm"
                                        value="paypal"
                                        checked={paymentMethod === "paypal"}
                                        onChange={() =>
                                            setPaymentMethod("paypal")
                                        }
                                    />
                                    <PaymentIcon />
                                </Box>
                            </Box>
                        </Sheet>
                    </Stack>
                </Grid>
                <Grid
                    xs={12}
                    md={5}
                    sx={{
                        flexGrow: 2,
                        px: {
                            xs: 0,
                            md: 2,
                        },
                    }}
                >
                    <Stack spacing={2}>
                        <Sheet sx={{ p: 2 }} variant={style}>
                            <Typography level="h4" color="primary">
                                Summary
                            </Typography>
                            <Stack spacing={2} mt={2}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Typography level="title-md">
                                        Subtotal
                                    </Typography>
                                    <Typography
                                        level="title-md"
                                        startDecorator="Rs. "
                                    >
                                        {subtotal}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Typography level="title-md">
                                        Shipping
                                    </Typography>
                                    <Typography level="title-md">
                                        Free
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Typography level="title-md">
                                        Service Fee
                                    </Typography>
                                    <Typography
                                        level="title-md"
                                        startDecorator="Rs. "
                                    >
                                        {fee}
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Typography level="h4">Total</Typography>
                                    <Typography
                                        level="h4"
                                        startDecorator="Rs. "
                                    >
                                        {total}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="solid"
                                    size="lg"
                                    fullWidth
                                    onClick={buttonAction}
                                >
                                    Place Order
                                </Button>
                            </Stack>
                        </Sheet>
                        <Sheet sx={{ p: 2 }} variant={style}>
                            <Typography level="body-md" color="neutral">
                                AgriVista keeps your payment information secure.
                                AgriVista sellers never receive your credit card
                                information.
                            </Typography>
                            <AspectRatio ratio={16 / 6} variant="plain">
                                <img
                                    src="/secure.png"
                                    alt="secure"
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />
                            </AspectRatio>
                        </Sheet>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
