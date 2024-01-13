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

function ClickableCard({
    loading = true,
    title,
    price,
    image,
    unit = "kg",
    onClick,
    badge,
}) {
    return (
        <Grid
            onClick={onClick}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
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
                                <img src={image} loading="lazy" alt={title} />
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
                </Card>
            </ApplyBadge>
        </Grid>
    );
}

function ApplyBadge({ badge, children }) {
    if (badge) {
        return (
            <Badge
                badgeContent={badge.name}
                color={badge.color}
                badgeInset="15%"
            >
                {children}
            </Badge>
        );
    }
    return <>{children}</>;
}

export default ClickableCard;
