import {
    AspectRatio,
    Box,
    Card,
    CardContent,
    CardOverflow,
    DialogContent,
    DialogTitle,
    Grid,
    Modal,
    ModalClose,
    ModalDialog,
    Typography,
} from "@mui/joy";
import Markdown from "react-markdown";
import React, { useState } from "react";

const data = [
    {
        id: 1,
        title: "Crop Rotation",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/new1-600x331.jpg",
    },
    {
        id: 2,
        title: "Soil Health Management",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/Big-Onion-150x150.jpg",
    },
    {
        id: 3,
        title: "Water Conservation",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/IMG_20191001_125430-1024x646.jpg",
    },
];
const mechanization = [
    {
        id: 1,
        title: "Land Preparation",
        src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
        link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
    },
    {
        id: 2,
        title: "Seed planting and transplanting",
        src: "https://doa.gov.lk/wp-content/uploads/2020/02/seeds-300x199.jpg",
        link: "https://drive.google.com/file/d/1km4KmJqK1Hfnkf_ZOReNSVgKYdPVOiGy/view",
    },
    {
        id: 3,
        title: "Crop maintenance",
        src: "https://doa.gov.lk/wp-content/uploads/2020/04/mp.png",
        link: "https://drive.google.com/file/d/1QMjAUSeTy4h0D5JwPKxtCo-35ZpXeBJ7/view",
    },
];
const postHarvest = [
    {
        id: 1,
        title: "Packing and Transportation",
        src: "https://doa.gov.lk/wp-content/uploads/2020/02/49A1100-350x233.jpg",
        link: "https://doa.gov.lk/harvest-transport/",
    },
    {
        id: 2,
        title: "Storage",
        src: "https://doa.gov.lk/wp-content/uploads/2021/01/store-vegetables-300x199.jpg",
        link: "https://doa.gov.lk/post-harvest-store/",
    },
    {
        id: 3,
        title: "Market",
        src: "https://doa.gov.lk/wp-content/uploads/2020/01/Department-of-Agriculture--300x200.jpg",
        link: "https://doa.gov.lk/harvest-market/",
    },
];

function Practices() {
    return (
        <Box>
            {/* Title */}
            <Typography level="h2" textAlign="center">
                Best Practices
            </Typography>
            {/* Farm Mechanization */}
            <Typography level="title-lg">Farm Mechanization</Typography>
            <Grid
                container
                spacing={2}
                m={1}
                sx={{
                    overflowX: "auto",
                }}
            >
                {mechanization.map((item) => (
                    <PracticesCard key={item.id} {...item} />
                ))}
            </Grid>
            {/* Post-Harvest & Value Addition */}
            <Typography level="title-lg">
                Post-Harvest & Value Addition
            </Typography>
            <Grid
                container
                spacing={2}
                m={1}
                sx={{
                    overflowX: "auto",
                }}
            >
                {postHarvest.map((item) => (
                    <PracticesCard key={item.id} {...item} />
                ))}
            </Grid>
        </Box>
    );
}
function PracticesCard({ id, title, src, link }) {
    return (
        <Grid
            xs={12}
            md={4}
            onClick={() => window.open(link)}
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
                </CardContent>
            </Card>
        </Grid>
    );
}
export default Practices;
