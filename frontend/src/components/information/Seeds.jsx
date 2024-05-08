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
import useGetInformation from "../../hooks/useGetInformation";

function Seeds() {
    const data = useGetInformation("seeds");
    return (
        <Box>
            {/* Title */}
            <Typography level="h2" textAlign="center">
                Seeds
            </Typography>
            <Grid
                container
                spacing={2}
                m={1}
                sx={{
                    overflowX: "auto",
                }}
            >
                {
                    // if data is empty, show skeleton
                    data.length === 0 &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <SeedCard key={index} loading />
                        ))
                }
                {data.map((item) => (
                    <SeedCard key={item._id} {...item} />
                ))}
            </Grid>
        </Box>
    );
}

function SeedCard({ id, title, src, link, description }) {
    return (
        <Grid
            xs={12}
            md={4}
            onClick={() => {
                if (!link) return;
                window.open(link);
            }}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <Card
                orientation="vertical"
                variant="outlined"
                sx={(theme) => ({
                    transition: "0.4s",
                    "&:hover": {
                        boxShadow: theme.shadow.xs,
                        transform: "scale(1.02)",
                    },
                })}
            >
                <CardOverflow>
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={src}
                            alt={title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    {(title && (
                        <Typography level="h3" textAlign="center">
                            {title}
                        </Typography>
                    )) || (
                        <Typography level="h3" textAlign="center">
                            <Skeleton>Loading Title</Skeleton>
                        </Typography>
                    )}
                    {(description && (
                        <Typography
                            level="body-md"
                            textAlign="center"
                            color="textSecondary"
                        >
                            {description}
                        </Typography>
                    )) || (
                        <Typography level="body-md" textAlign="center">
                            <Skeleton>Loading Description</Skeleton>
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Seeds;
