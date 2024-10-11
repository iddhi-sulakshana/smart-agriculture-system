import { Box, Sheet, Stack, Typography } from "@mui/joy";
import React from "react";
import { DisplayRelativeTime } from "../../Utils/DateTime";
import ClickableCard from "../common/ClickableCard";
import useGetCropViewDetails from "../../hooks/useGetCropViewDetails";
import useGetOrderViewDetails from "../../hooks/useGetOrderViewDetails";
import OrderCard from "../common/OrderCard";

function ChatBubble({
    message,
    variant,
    timestamp,
    sender,
    isProduct,
    isOrder,
}) {
    let crop;
    let order;
    if (isProduct) crop = useGetCropViewDetails(message);
    else if (isOrder) order = useGetOrderViewDetails(message);
    const isSent = variant === "sent";
    return (
        <Box sx={{ maxWidth: "60%" }}>
            <Stack
                direction="row"
                justifyContent={sender === "You" ? "flex-end" : "flex-start"}
                spacing={2}
                sx={{ mb: 0.25 }}
            >
                <Typography level="body-xs">
                    {sender === "You" ? "" : sender.split(" ")[0]}
                </Typography>
                <Typography level="body-xs">
                    {DisplayRelativeTime(timestamp)}
                </Typography>
            </Stack>
            <Box sx={{ position: "relative" }}>
                <Sheet
                    color={isSent ? "primary" : "neutral"}
                    variant={isSent ? "solid" : "soft"}
                    sx={{
                        p: 1.25,
                        borderRadius: "lg",
                        borderTopRightRadius: isSent ? 0 : "lg",
                        borderTopLeftRadius: isSent ? "lg" : 0,
                        backgroundColor: isSent
                            ? "var(--joy-palette-primary-solidBg)"
                            : "background.body",
                    }}
                >
                    {isProduct ? (
                        <ClickableCard
                            id={crop?._id}
                            title={crop?.title}
                            price={crop?.price}
                            unit={crop?.unit}
                            location={crop?.location}
                            loading={!crop}
                            image={crop?.image}
                        />
                    ) : isOrder ? (
                        <OrderCard
                            title={order?.crop?.title}
                            isPaid={order?.isPaid}
                            method={order?.method}
                            paymentId={order?.paymentId}
                            quantity={order?.quantity}
                            shippingDetails={order?.shippingDetails}
                            total={order?.total}
                            unit={order?.crop?.unit}
                            image={order?.crop?.image}
                            loading={!order}
                        />
                    ) : (
                        <Typography
                            level="body-sm"
                            sx={{
                                color: isSent
                                    ? "var(--joy-palette-common-white)"
                                    : "var(--joy-palette-text-primary)",
                            }}
                        >
                            {message}
                        </Typography>
                    )}
                </Sheet>
            </Box>
        </Box>
    );
}

export default ChatBubble;
