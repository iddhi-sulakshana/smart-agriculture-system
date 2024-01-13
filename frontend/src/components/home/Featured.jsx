import {
    AspectRatio,
    Box,
    Button,
    Card,
    CardContent,
    CardCover,
    CardOverflow,
    Chip,
    Grid,
    Link,
    Typography,
} from "@mui/joy";
import React from "react";
import ClickableCard from "../common/ClickableCard";

function Featured() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                my: 5,
            }}
        >
            <Typography level="h2">Featured</Typography>
            <Typography level="body-md">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia
            </Typography>
            <Grid
                container
                spacing={3}
                justifyContent={{ xs: "center", md: "space-between" }}
                mt={3}
                sx={{ flexGrow: 1 }}
            >
                {/* 1 to 10 array then map */}
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <ClickableCard
                            key={i}
                            loading={false}
                            title="Bell Pepper"
                            image="https://themewagon.github.io/vegefoods/images/product-1.jpg"
                            price={1000}
                            badge={{ name: "new", color: "success" }}
                        />
                    ))}
            </Grid>
        </Box>
    );
}

export default Featured;
