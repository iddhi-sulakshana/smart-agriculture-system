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

function Practices() {
    const mechanization = useGetInformation("practices.mechanization");
    const postHarvest = useGetInformation("practices.postharvest");
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
                {
                    // if mechanization is empty, show skeleton
                    mechanization.length === 0 &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <PracticesCard key={index} loading />
                        ))
                }
                {mechanization.map((item) => (
                    <PracticesCard key={item._id} {...item} />
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
                {
                    // if postHarvest is empty, show skeleton
                    postHarvest.length === 0 &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <PracticesCard key={index} loading />
                        ))
                }
                {postHarvest.map((item) => (
                    <PracticesCard key={item._id} {...item} />
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
            onClick={() => {
                if (!link) return;
                window.open(link, "_blank");
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
                    {!title ? (
                        <Typography level="body-md" textAlign="center">
                            <Skeleton>Loading Title goes over here</Skeleton>
                        </Typography>
                    ) : (
                        <Typography
                            level="body-md"
                            textAlign="center"
                            fontWeight="lg"
                            textColor="primary.plainColor"
                        >
                            {title}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
export default Practices;
