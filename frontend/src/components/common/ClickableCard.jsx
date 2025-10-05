// ClickableCard.jsx - Enhanced with Framer Motion

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
import { motion } from "framer-motion";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { useNavigate } from "react-router-dom";
import { Badge as AntBadge } from "antd";
import { getRootURL } from "../../Utils/Url";

// Animation variants
const cardVariants = {
    rest: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        scale: 1.04,
        y: -8,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    tap: {
        scale: 0.98,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
};

const imageVariants = {
    rest: {
        scale: 1,
        filter: "brightness(1) contrast(1)",
    },
    hover: {
        scale: 1.1,
        filter: "brightness(1.1) contrast(1.05)",
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

const overlayVariants = {
    rest: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

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
        <motion.div
            initial="rest"
            whileHover={!loading ? "hover" : "rest"}
            whileTap={!loading ? "tap" : "rest"}
            variants={cardVariants}
            style={{ cursor: loading ? "default" : "pointer" }}
        >
            <Grid onClick={onClick}>
                <ApplyPriceBadge category={category} price={price}>
                    <ApplyBadge badge={badge}>
                        <Card
                            orientation="vertical"
                            variant="outlined"
                            sx={(theme) => ({
                                minWidth: "14rem",
                                borderRadius: "16px",
                                overflow: "hidden",
                                transition: "box-shadow 0.3s ease",
                                position: "relative",
                                "&:hover": {
                                    boxShadow: theme.shadow.xl,
                                },
                            })}
                        >
                            <CardOverflow
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <AspectRatio ratio={1}>
                                    {loading ? (
                                        <Skeleton
                                            animation="wave"
                                            variant="rectangular"
                                            sx={{
                                                background:
                                                    "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                                                backgroundSize: "200% 100%",
                                                "@keyframes wave": {
                                                    "0%": {
                                                        backgroundPosition: "-200% 0",
                                                    },
                                                    "100%": {
                                                        backgroundPosition: "200% 0",
                                                    },
                                                },
                                                animation: "wave 1.5s infinite",
                                            }}
                                        >
                                            <img src="" alt="loading" />
                                        </Skeleton>
                                    ) : (
                                        <motion.img
                                            variants={imageVariants}
                                            src={getRootURL(`crops/${image}`)}
                                            loading="lazy"
                                            alt={title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </AspectRatio>

                                {/* Gradient overlay on hover */}
                                {!loading && (
                                    <motion.div
                                        variants={overlayVariants}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                )}
                            </CardOverflow>

                            <CardContent sx={{ textAlign: "center" }}>
                                {loading ? (
                                    <Typography level="body-md" textAlign="center">
                                        <Skeleton animation="wave">Loading</Skeleton>
                                    </Typography>
                                ) : (
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <Typography
                                            textAlign="center"
                                            level="body-md"
                                            fontWeight="lg"
                                            textColor="primary.plainColor"
                                        >
                                            {title}
                                        </Typography>
                                    </motion.div>
                                )}

                                {loading ? (
                                    <Typography textAlign="center" level="body-md">
                                        <Skeleton animation="wave">Loading</Skeleton>
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
                                        <motion.div
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.2 },
                                            }}
                                        >
                                            <Typography
                                                textAlign="center"
                                                level="body-md"
                                                startDecorator="Rs."
                                                endDecorator={`/${unit}`}
                                                sx={{ fontWeight: "md" }}
                                            >
                                                {Number(price).toFixed(2)}
                                            </Typography>
                                        </motion.div>
                                    </Box>
                                )}
                            </CardContent>

                            <CardOverflow>
                                {loading ? (
                                    <Skeleton animation="wave">Loading</Skeleton>
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
                                        <motion.div
                                            whileHover={{
                                                scale: 1.1,
                                                transition: { duration: 0.2 },
                                            }}
                                        >
                                            <Typography
                                                textAlign="center"
                                                level="body-sm"
                                                startDecorator={<PlaceRoundedIcon />}
                                            >
                                                {location}
                                            </Typography>
                                        </motion.div>
                                    </Box>
                                )}
                            </CardOverflow>
                        </Card>
                    </ApplyBadge>
                </ApplyPriceBadge>
            </Grid>
        </motion.div>
    );
}

function ApplyBadge({ badge, children }) {
    if (badge) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <AntBadge.Ribbon text={badge.name} color={badge.color}>
                    {children}
                </AntBadge.Ribbon>
            </motion.div>
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
            <motion.div
                animate={{
                    y: [0, -3, 0],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ArrowUpwardRoundedIcon />
            </motion.div>
        ) : badge === "down" ? (
            <motion.div
                animate={{
                    y: [0, 3, 0],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ArrowDownwardRoundedIcon />
            </motion.div>
        ) : (
            <></>
        );

    const color =
        badge === "up" ? "success" : badge === "down" ? "danger" : "neutral";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
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
        </motion.div>
    );
}

export default ClickableCard;