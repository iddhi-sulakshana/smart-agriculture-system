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
        title: "FERTILIZER RECOMMENDATION ACCORDING TO SOIL ANALYSIS KIT",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/new1-600x331.jpg",
        link: "https://doa.gov.lk/rrdi_fertilizerrecomendation_soilkit_rainfed_izdz/",
    },
    {
        id: 2,
        title: "FERTILIZER RECOMMENDATION BASED ON SOIL ANALYSIS REPORTS",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/Big-Onion-150x150.jpg",
        link: "https://doa.gov.lk/rrdi_fertilizerrecomendation_soilreport_rainfed_izdz/",
    },
    {
        id: 3,
        title: "FERTILIZER RECOMMENDATION ACCORDING TO LEAF COLOR INDEX VALUE",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/IMG_20191001_125430-1024x646.jpg",
        link: "https://doa.gov.lk/rrdi_fertilizerrecomendation_leafcolorchart_irrigated_izdz/",
    },
];

function Fertilizers() {
    return (
        <Box>
            {/* Title */}
            <Typography level="h2" textAlign="center">
                Fertilizers
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
                    <FertilizerCard key={item.id} {...item} />
                ))}
            </Grid>
        </Box>
    );
}
function FertilizerCard({ title, src, link }) {
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
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Fertilizers;
