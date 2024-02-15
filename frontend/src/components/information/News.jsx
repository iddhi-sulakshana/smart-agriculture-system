import {
    Grid,
    Card,
    Sheet,
    Typography,
    CardOverflow,
    CardContent,
} from "@mui/joy";
import React from "react";
import useGetNews from "../../hooks/useGetNews";
import { formatDate } from "../../Utils/FormatDate";

function News() {
    const news = useGetNews();
    return (
        <Sheet
            sx={{
                borderLeft: "1px solid",
                borderColor: "divider",
            }}
        >
            {/* Title */}
            <Typography level="h2" textAlign="center">
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
                {news.map((newsItem) => (
                    <NewsItem key={newsItem._id} newsItem={newsItem} />
                ))}
            </Grid>
        </Sheet>
    );
}

function NewsItem({ newsItem: { title, description, date } }) {
    return (
        <Grid
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
                        {title}
                    </Typography>
                    <Typography level="body-md">{description}</Typography>
                </CardContent>
                <CardOverflow>
                    <Typography textAlign="right" color="neutral">
                        {formatDate(date)}
                    </Typography>
                </CardOverflow>
            </Card>
        </Grid>
    );
}

export default News;
