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
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserDetails from "../hooks/useUserDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import { toast } from "react-toastify";

const Checkout = () => {
    const style = "outlined";
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);
    if (state !== undefined && state !== null) {
        var { product, quantity, subtotal } = state;
    }
    const [checked, setChecked] = React.useState(true);
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState("");

    const { userDetails, loading, error } = useUserDetails();

    useEffect(() => {
        if (state === undefined || state === null) {
            navigate("/market");
        }
    }, []);

    useEffect(() => {
        if (checked) {
            setName(userDetails?.name);
            setPhone(userDetails?.phone);
            setAddress(userDetails?.address);
        }
    }, [checked]);
    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name);
            setPhone(userDetails.phone);
            setAddress(userDetails.address);
        }
    }, [userDetails]);

    const buttonAction = () => {
        if (paymentMethod === "") {
            return toast.error("Please select a payment method");
        }
        if (
            checked === false &&
            (name === "" || phone === "" || address === "")
        ) {
            return toast.error("Please fill all the details");
        }

        if (paymentMethod === "bank") {
            navigate("/payment?method=bank");
        } else {
            navigate("/payment?method=paypal");
        }
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
                            {checked ? (
                                <Box mt={2}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            level="body-md"
                                            color="neutral"
                                        >
                                            {userDetails?.name}
                                        </Typography>
                                        <Typography
                                            level="body-md"
                                            color="neutral"
                                        >
                                            |
                                        </Typography>
                                        <Typography
                                            level="body-md"
                                            color="neutral"
                                        >
                                            {userDetails?.phone}
                                        </Typography>
                                    </Box>
                                    <Typography level="body-md" color="neutral">
                                        {userDetails?.address}
                                    </Typography>
                                </Box>
                            ) : (
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
                                </Box>
                            )}
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
                                    <Typography level="title-md">
                                        Rs. {subtotal}
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
                                <Divider />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Typography level="h4">Total</Typography>
                                    <Typography level="h4">
                                        Rs. {subtotal}
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
