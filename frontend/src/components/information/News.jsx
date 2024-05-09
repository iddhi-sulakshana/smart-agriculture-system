import {
    Grid,
    Card,
    Sheet,
    Typography,
    CardOverflow,
    CardContent,
    Skeleton,
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
                {
                    // if news is empty, show skeleton
                    news.length === 0 &&
                        Array.from({ length: 3 }).map((_, index) => (
                            <NewsItem
                                key={index}
                                loading
                                newsItem={{
                                    title: null,
                                    description: null,
                                    date: null,
                                }}
                            />
                        ))
                }
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
                    {!title ? (
                        <Typography level="body-md" textAlign="center">
                            <Skeleton>Loading Title goes over here</Skeleton>
                        </Typography>
                    ) : (
                        <Typography level="body-md" textAlign="center">
                            {title}
                        </Typography>
                    )}
                    {!description ? (
                        <Typography level="body-md" textAlign="center">
                            <Skeleton>
                                Loading Description goes over here
                            </Skeleton>
                        </Typography>
                    ) : (
                        <Typography level="body-md">{description}</Typography>
                    )}
                </CardContent>
                <CardOverflow>
                    {
                        // if date is null, show skeleton
                        date ? (
                            <Typography level="body-md" textAlign="center">
                                {formatDate(date)}
                            </Typography>
                        ) : (
                            <Typography level="body-md" textAlign="center">
                                <Skeleton>Loading Date goes over here</Skeleton>
                            </Typography>
                        )
                    }
                </CardOverflow>
            </Card>
        </Grid>
    );
}

export default News;
