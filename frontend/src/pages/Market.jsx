import { Box } from "@mui/joy";
import React from "react";
import TopBar from "../components/market/TopBar";
import Products from "../components/market/Products";
import CustomPagination from "../components/common/CustomPagination";

function Market() {
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
            <TopBar />
            <Products />
            <CustomPagination />
        </Box>
    );
}

export default Market;
