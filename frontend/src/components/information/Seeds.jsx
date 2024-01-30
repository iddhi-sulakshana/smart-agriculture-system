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
const data = [
    {
        id: 1,
        title: "Government Seed and Planting Material Sales Centers",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/new1-600x331.jpg",
        link: "https://doa.gov.lk/spmdc-salescenter-e/",
    },
    {
        id: 2,
        title: "Seeds-Price index",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/Big-Onion-150x150.jpg",
        link: "https://doa.gov.lk/spmdc-downloads_en/",
    },
    {
        id: 3,
        title: "Seed Certification Service",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/IMG_20191001_125430-1024x646.jpg",
        description:
            "The Seed Certification Service of the Department of Agriculture was formally established in 1979 with the assistance of the Netherland Government Aid program.",
        link: "https://doa.gov.lk/scs-home/",
    },
    {
        id: 4,
        title: "Vegetables",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/cabbage-3-150x150.jpg",
    },
];

function Seeds() {
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
                    <SeedCard key={item.id} {...item} />
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
