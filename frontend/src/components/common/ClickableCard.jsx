import {
    AspectRatio,
    Badge,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Grid,
    Skeleton,
    Typography,
} from "@mui/joy";
import React from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { useNavigate } from "react-router-dom";
import { Badge as AntBadge } from "antd";

function ClickableCard({
    id,
    loading = true,
    title,
    price,
    priceFluctuation,
    image,
    unit = "kg",
    location,
    badge,
}) {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/product/${id}`);
    };
    return (
        <Grid
            onClick={onClick}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <ApplyPriceBadge badge={priceFluctuation}>
                <ApplyBadge badge={badge}>
                    <Card
                        orientation="vertical"
                        variant="outlined"
                        sx={(theme) => ({
                            transition: "0.4s",
                            minWidth: "14rem",
                            "&:hover": {
                                boxShadow: theme.shadow.xl,
                                transform: "scale(1.04)",
                            },
                        })}
                    >
                        <CardOverflow>
                            <AspectRatio ratio={1}>
                                {loading ? (
                                    <Skeleton>
                                        <img src="" alt="loading" />
                                    </Skeleton>
                                ) : (
                                    <img
                                        src={image}
                                        loading="lazy"
                                        alt={title}
                                    />
                                )}
                            </AspectRatio>
                        </CardOverflow>
                        <CardContent sx={{ textAlign: "center" }}>
                            {loading ? (
                                <Typography level="body-md" textAlign="center">
                                    <Skeleton>Loading</Skeleton>
                                </Typography>
                            ) : (
                                <Typography
                                    textAlign="center"
                                    level="body-md"
                                    fontWeight="lg"
                                    textColor="primary.plainColor"
                                >
                                    {title}
                                </Typography>
                            )}

                            {loading ? (
                                <Typography textAlign="center" level="body-md">
                                    <Skeleton>Loading</Skeleton>
                                </Typography>
                            ) : (
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        level="body-md"
                                        startDecorator="Rs."
                                        endDecorator={`/${unit}`}
                                    >
                                        {Number(price).toFixed(2)}
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                        <CardOverflow>
                            {loading ? (
                                <Skeleton>Loading</Skeleton>
                            ) : (
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}
                                    mb={1}
                                >
                                    <Typography
                                        textAlign="center"
                                        level="body-sm"
                                        startDecorator={<PlaceRoundedIcon />}
                                    >
                                        {location}
                                    </Typography>
                                </Box>
                            )}
                        </CardOverflow>
                    </Card>
                </ApplyBadge>
            </ApplyPriceBadge>
        </Grid>
    );
}

function ApplyBadge({ badge, children }) {
    if (badge) {
        return (
            // <Badge
            //     badgeContent={badge.name}
            //     color={badge.color}
            //     badgeInset="15%"
            // >
            //     {children}
            // </Badge>
            <AntBadge.Ribbon text={badge.name} color={badge.color}>
                {children}
            </AntBadge.Ribbon>
        );
    }
    return <>{children}</>;
}
function ApplyPriceBadge({ badge, children }) {
    if ((badge && badge === "up") || badge === "down") {
        const icon =
            badge === "up" ? (
                <ArrowUpwardRoundedIcon />
            ) : (
                <ArrowDownwardRoundedIcon />
            );
        const color = badge === "up" ? "success" : "danger";
        return (
            <Badge
                badgeContent={icon}
                variant="outlined"
                color={color}
                badgeInset="15%"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
                {children}
            </Badge>
        );
    }
    return <>{children}</>;
}

export default ClickableCard;
