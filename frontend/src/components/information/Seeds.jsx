import {
    AspectRatio,
    Box,
    Card,
    CardContent,
    CardOverflow,
    Grid,
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
                    <Typography
                        level="title-lg"
                        textAlign="center"
                        color="primary"
                    >
                        {title}
                    </Typography>
                    {description && (
                        <Typography
                            level="body-md"
                            textAlign="center"
                            color="textSecondary"
                        >
                            {description}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Seeds;
