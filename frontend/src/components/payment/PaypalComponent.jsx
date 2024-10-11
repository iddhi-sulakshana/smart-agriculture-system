import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Typography } from "@mui/joy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import { getPaypalClientId, getURL } from "../../Utils/Url";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const PaypalComponent = ({
    total,
    name,
    product,
    address,
    phone,
    quantity,
    paymentMethod,
    email,
    city,
    postal,
}) => {
    const navigate = useNavigate();

    const [isPaid, setIsPaid] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const { token } = UserContext();
    const initialOptions = {
        clientId: getPaypalClientId(),
        "enable-funding": "",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-detail",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

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
                            email: email,
                            city: city,
                            postal: postal,
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
                        navigate("/messages");
                    }, 1000);
                })
                .catch((error) => {
                    toast.error(
                        "Payment Suceess but order creation failed please contact us immediately"
                    );
                });
        }
    }, [isPaid]);

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
