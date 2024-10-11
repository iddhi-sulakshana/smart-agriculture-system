import { Button } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getURL } from "../../Utils/Url";
import UserContext from "../../contexts/UserContext";

function PayhereButton({
    name,
    email,
    phone,
    address,
    city,
    postal,
    total,
    product,
    quantity,
    paymentMethod,
}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { token } = UserContext();

    const handleClick = async () => {
        setLoading(true);

        const paymentDetails = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            city: city,
            total: total,
            postal: postal,
            currency: "LKR",
            country: "Sri Lanka",
            product: product,
            quantity: quantity,
        };
        let response;
        try {
            response = await axios.request({
                method: "POST",
                url: getURL("payment/start"),
                headers: {
                    "x-auth-token": token,
                },
                data: {
                    paymentId: "PENDING_PAYHERE",
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
                },
            });
        } catch (error) {
            console.log(error);
            toast.error("Error Creating Order for Payhere");
            setLoading(false);
            return;
        }
        const { hash, merchant_id, order_id } = response.data;
        console.log(hash, merchant_id);
        const currentDomain = window.location.origin;
        var payment = {
            sandbox: true,
            merchant_id: merchant_id, // Replace your Merchant ID
            return_url: `${currentDomain}/orders/${order_id}`, // Important
            cancel_url: `${currentDomain}/orders/${order_id}?cancel=true`, // Important
            notify_url: getURL("payment/notify"), // Important
            order_id: order_id,
            items: product.title + " x " + quantity + product.unit,
            amount: Number(total).toFixed(2),
            currency: "LKR",
            hash: hash.toString().toUpperCase(), // *Replace with generated hash retrieved from backend
            first_name: name,
            last_name: name,
            email: email,
            phone: phone,
            address: address,
            city: city,
            country: "Sri Lanka",
        };

        payhere.onError = (error) => {
            console.log(error);
            toast.error("An error occurred while processing the payment");
            setLoading(false);
        };

        payhere.onDismissed = async () => {
            try {
                axios.request({
                    method: "DELETE",
                    url: getURL(`payment/delete/${order_id}`),
                    headers: {
                        "x-auth-token": token,
                    },
                });
            } catch (error) {
                console.log(error);
                toast.error("Error Deleting Order");
            }
            toast.error("Payment Dismissed");
            setLoading(false);
        };

        payhere.onCompleted = async () => {
            toast.success("Payment Completed");
            setLoading(false);
        };

        console.log(payment);

        payhere.startPayment(payment);

        setLoading(false);
    };

    useEffect(() => {
        // <script type="text/javascript" src="https://www.payhere.lk/lib/payhere.js"></script>
        const script = document.createElement("script");
        script.src = "https://www.payhere.lk/lib/payhere.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    return (
        <Button
            size="lg"
            sx={{ mt: 2 }}
            fullWidth
            id="payhere-payment"
            loading={loading}
            onClick={handleClick}
        >
            Pay with Payhere
        </Button>
    );
}

export default PayhereButton;
