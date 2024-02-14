import { Grid } from "@mui/joy";
import React from "react";
import ClickableCard from "../common/ClickableCard";

function Products({ crops }) {
    return (
        <Grid
            container
            spacing={3}
            justifyContent={{ xs: "center", md: "space-between" }}
            mt={3}
            sx={{ flexGrow: 1 }}
        >
            {/* 1 to 10 array then map */}
            {crops.map((item, i) => (
                <ClickableCard
                    id={i}
                    key={i}
                    priceFluctuation={item.priceFluctuation}
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
