import {
    Grid,
    Card,
    Sheet,
    Typography,
    CardOverflow,
    AspectRatio,
    Skeleton,
    CardContent,
} from "@mui/joy";
import React from "react";

function News() {
    const loading = false;
    return (
        <Sheet
            sx={{
                borderLeft: "1px solid",
                borderColor: "divider",
            }}
        >
            {/* Title */}
            <Typography
                fontSize="lg"
                level="h1"
                fontWeight="lg"
                textAlign="center"
            >
                News
            </Typography>
            <Grid
                container
                spacing={2}
                m={1}
                sx={{
                    overflowY: "scroll",
                    height: "65dvh",
                }}
            >
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </Grid>
        </Sheet>
    );
}

function NewsItem() {
    return (
        <Grid
            item
            xs={12}
            onClick={() => {}}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <Card
                orientation="vertical"
                variant="outlined"
                sx={(theme) => ({
                    transition: "0.4s",
                    minHeight: "5rem",
                    "&:hover": {
                        boxShadow: theme.shadow.xs,
                        transform: "scale(1.02)",
                    },
                })}
            >
                <CardContent>
                    <Typography
                        level="title-lg"
                        textAlign="center"
                        color="primary"
                    >
                        Some news about something Some news about something
                    </Typography>
                    <Typography level="body-md">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nobis deleniti dignissimos eligendi fuga minima
                        temporibus,
                    </Typography>
                </CardContent>
                <CardOverflow>
                    <Typography textAlign="right" color="neutral">
                        2023 July 12
                    </Typography>
                </CardOverflow>
            </Card>
        </Grid>
    );
}

export default News;
