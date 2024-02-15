import { Box, Grid, Typography } from "@mui/joy";
import React from "react";
import ClickableCard from "../common/ClickableCard";
import useGetFeatured from "../../hooks/useGetFeatured";

function Featured() {
    const featured = useGetFeatured();
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
                {featured.map((item) => (
                    <ClickableCard
                        key={item._id}
                        loading={false}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        location={item.location.name}
                        badge={{ name: "new", color: "success" }}
                        priceFluctuation={item.category.priceFluctuation}
                    />
                ))}
            </Grid>
        </Box>
    );
}

export default Featured;
