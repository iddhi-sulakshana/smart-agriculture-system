import {
    Badge,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Divider,
    Grid,
    Skeleton,
    Typography,
} from "@mui/joy";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";

function OrderCard({
    title,
    isPaid,
    method,
    paymentId,
    quantity,
    shippingDetails,
    total,
    unit,
    loading,
}) {
    return (
        <Grid>
            <Badge
                color={isPaid ? "success" : "danger"}
                badgeContent={isPaid ? "Paid" : "Not Paid"}
                size="lg"
                badgeInset="10%"
            >
                <Card
                    orientation="vertical"
                    variant="outlined"
                    sx={(theme) => ({
                        minWidth: "14rem",
                    })}
                >
                    <CardContent>
                        {loading ? (
                            <Typography level="body-md">
                                <Skeleton>Loading</Skeleton>
                            </Typography>
                        ) : (
                            <Typography
                                level="body-md"
                                fontWeight="lg"
                                textColor="primary.plainColor"
                            >
                                {title}
                            </Typography>
                        )}
                        <Divider>Order Details</Divider>
                        {loading ? (
                            <Typography level="body-md" textAlign="center">
                                <Skeleton>Loading</Skeleton>
                            </Typography>
                        ) : (
                            <Typography
                                textAlign="center"
                                level="body-sm"
                                textColor="primary.plainColor"
                                startDecorator="Order ID : "
                            >
                                {paymentId}
                            </Typography>
                        )}
                        {loading ? (
                            <Typography level="body-md" textAlign="center">
                                <Skeleton>Loading</Skeleton>
                            </Typography>
                        ) : (
                            <Typography
                                textAlign="center"
                                level="body-md"
                                startDecorator="Quantity : "
                                endDecorator={unit}
                            >
                                {quantity}
                            </Typography>
                        )}

                        {loading ? (
                            <Typography level="body-md" textAlign="center">
                                <Skeleton>Loading</Skeleton>
                            </Typography>
                        ) : (
                            <Typography
                                textAlign="center"
                                level="body-md"
                                startDecorator="Total : Rs."
                            >
                                {total}
                            </Typography>
                        )}

                        {loading ? (
                            <Typography level="body-md" textAlign="center">
                                <Skeleton>Loading</Skeleton>
                            </Typography>
                        ) : (
                            <Typography
                                textAlign="center"
                                level="body-md"
                                startDecorator="Payment Method: "
                            >
                                {method.toUpperCase()}
                            </Typography>
                        )}
                    </CardContent>
                    <Divider>Shipping Details</Divider>
                    <CardOverflow>
                        {loading ? (
                            <Skeleton>Loading</Skeleton>
                        ) : (
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                }}
                                mb={1}
                            >
                                <Typography
                                    level="body-sm"
                                    startDecorator={<AccountCircleIcon />}
                                >
                                    {shippingDetails?.name}
                                </Typography>
                            </Box>
                        )}
                        {loading ? (
                            <Skeleton>Loading</Skeleton>
                        ) : (
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                }}
                                mb={1}
                            >
                                <Typography
                                    level="body-sm"
                                    startDecorator={<PlaceRoundedIcon />}
                                >
                                    {shippingDetails?.address}
                                </Typography>
                            </Box>
                        )}
                        {loading ? (
                            <Skeleton>Loading</Skeleton>
                        ) : (
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                }}
                                mb={1}
                            >
                                <Typography
                                    level="body-sm"
                                    startDecorator={<LocalPhoneIcon />}
                                >
                                    {shippingDetails?.phone}
                                </Typography>
                            </Box>
                        )}
                    </CardOverflow>
                </Card>
            </Badge>
        </Grid>
    );
}

export default OrderCard;
