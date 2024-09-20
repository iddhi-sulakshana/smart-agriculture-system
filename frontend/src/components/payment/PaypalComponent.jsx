import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Typography } from "@mui/joy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";

const PaypalComponent = ({ total, isPaid, setIsPaid, orderId, setOrderId }) => {
    const initialOptions = {
        clientId:
            "AdPGJlh3vZUG3ld-jfyqd0ZPmw3_AG7t8AHjgiKvjZAsxrhXWjhTdURWG3SUTH53WwYuDI8oKkfY0hFi",
        "enable-funding": "",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-detail",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "center",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            {!isPaid ? (
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: total,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            setIsPaid(true);
                            setOrderId(data.orderID);
                        }}
                        onCancel={(data) => {
                            toast.error("Payment cancelled");
                        }}
                        onError={(err) => {
                            toast.error("Error in payment");
                            console.log(err);
                        }}
                    />
                </PayPalScriptProvider>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <CheckCircleOutlineIcon
                        sx={{ fontSize: 100, color: "success.main" }}
                    />
                    <Typography level="h4" sx={{ mt: 1 }}>
                        Payment successful
                    </Typography>
                    <Typography level="body-md">
                        Your order id is {orderId}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default PaypalComponent;
