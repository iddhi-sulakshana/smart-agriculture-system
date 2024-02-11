import {
    AspectRatio,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Grid,
    Skeleton,
    Typography,
} from "@mui/joy";
import React from "react";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { getRootURL } from "../../Utils/Url";

function CropClickableCard({
    loading = true,
    title,
    price,
    image,
    stock,
    unit = "kg",
    location,
}) {
    const onClick = () => {};
    return (
        <Grid
            onClick={onClick}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
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
                    <AspectRatio ratio={2 / 1}>
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
                                endDecorator={`${unit}`}
                            >
                                {Number(stock).toFixed(2)}
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
        </Grid>
    );
}

export default CropClickableCard;
