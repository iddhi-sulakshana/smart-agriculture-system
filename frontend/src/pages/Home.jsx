import { Box } from "@mui/joy";
import React from "react";
import CarouselCover from "../components/home/CarouselCover";
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
        </Box>
    );
}

export default Home;
