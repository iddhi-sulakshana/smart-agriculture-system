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
import { getRootURL } from "../../Utils/Url";

function ClickableCard({
    id,
    loading = true,
    title,
    price,
    category,
    image,
    unit = "kg",
    location,
    badge,
}) {
    const navigate = useNavigate();
    const onClick = () => {
        if (!id) return;
        navigate(`/product/${id}`);
    };
    return (
        <Grid
            onClick={onClick}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <ApplyPriceBadge category={category} price={price}>
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
                                        src={getRootURL(`crops/${image}`)}
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
            <AntBadge.Ribbon text={badge.name} color={badge.color}>
                {children}
            </AntBadge.Ribbon>
        );
    }
    return <>{children}</>;
}
function ApplyPriceBadge({ category, price, children }) {
    if (!category) return <>{children}</>;
    let badge = "up";
    if (category.weekPrice > price) badge = "down";
    let percentage;
    if (category.weekPrice === 0) {
        percentage = 0;
    } else {
        percentage = Math.abs(
            ((category.weekPrice - price) / price) * 100
        ).toFixed(1);
        if (percentage === "0.0") {
            percentage = "0";
            badge = "neutral";
        }
    }
    const icon =
        badge === "up" ? (
            <ArrowUpwardRoundedIcon />
        ) : badge === "down" ? (
            <ArrowDownwardRoundedIcon />
        ) : (
            <></>
        );
    const color =
        badge === "up" ? "success" : badge === "down" ? "danger" : "neutral";
    return (
        <Badge
            badgeContent={
                <Typography level="body-sm" color={color} endDecorator={icon}>
                    {percentage}%
                </Typography>
            }
            variant="outlined"
            color={color}
            badgeInset="5%"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
            {children}
        </Badge>
    );
}

export default ClickableCard;
