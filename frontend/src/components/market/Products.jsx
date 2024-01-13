import { Grid } from "@mui/joy";
import React from "react";
import ClickableCard from "../common/ClickableCard";

const productList = [
    {
        title: "Bell Pepper",
        price: 1000,
        image: "https://themewagon.github.io/vegefoods/images/product-1.jpg",
    },
    {
        title: "Strawberry",
        price: 2000,
        image: "https://themewagon.github.io/vegefoods/images/product-2.jpg",
    },
    {
        title: "Tomato",
        price: 1200,
        image: "https://themewagon.github.io/vegefoods/images/product-3.jpg",
    },
    {
        title: "Carrot",
        price: 800,
        image: "https://themewagon.github.io/vegefoods/images/product-4.jpg",
    },
    {
        title: "Broccoli",
        price: 1500,
        image: "https://themewagon.github.io/vegefoods/images/product-5.jpg",
    },
    {
        title: "Cucumber",
        price: 900,
        image: "https://themewagon.github.io/vegefoods/images/product-6.jpg",
    },
    {
        title: "Apple",
        price: 1800,
        image: "https://themewagon.github.io/vegefoods/images/product-7.jpg",
    },
    {
        title: "Orange",
        price: 1600,
        image: "https://themewagon.github.io/vegefoods/images/product-8.jpg",
    },
    {
        title: "Lettuce",
        price: 1100,
        image: "https://themewagon.github.io/vegefoods/images/product-9.jpg",
    },
    {
        title: "Grapes",
        price: 2200,
        image: "https://themewagon.github.io/vegefoods/images/product-10.jpg",
    },
];

function Products() {
    return (
        <Grid
            container
            spacing={3}
            justifyContent={{ xs: "center", md: "space-between" }}
            mt={3}
            sx={{ flexGrow: 1 }}
        >
            {/* 1 to 10 array then map */}
            {productList.map((item, i) => (
                <ClickableCard
                    key={i}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    badge={{ name: "new", color: "success" }}
                    loading={false}
                />
            ))}
        </Grid>
    );
}

export default Products;
