import { Grid } from "@mui/joy";
import React from "react";
import ClickableCard from "../common/ClickableCard";

function Products({ crops }) {
    return (
        <Grid
            container
            spacing={6}
            justifyContent={{ xs: "center", md: "flex-start" }}
            mt={0}
            sx={{ flexGrow: 1 }}
        >
            {crops.length === 0 &&
                Array.from({ length: 5 }).map((_, index) => (
                    <ClickableCard key={index} loading />
                ))}
            {crops.map((item) => (
                <ClickableCard
                    id={item._id}
                    key={item._id}
                    category={item.category}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    location={item.location}
                    badge={{ name: item.tags[0], color: "green" }}
                    loading={false}
                />
            ))}
        </Grid>
    );
}

export default Products;
