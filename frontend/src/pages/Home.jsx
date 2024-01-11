import { Box } from "@mui/joy";
import React from "react";
import CarouselCover from "../components/home/CarouselCover";
import Features from "../components/home/Features";
import Featured from "../components/home/Featured";
function Home() {
    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <CarouselCover />
            <Features />
            <Featured />
        </Box>
    );
}

export default Home;
