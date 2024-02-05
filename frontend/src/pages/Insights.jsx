import { Box, Typography } from "@mui/joy";
import React from "react";
import PricesTable from "../components/insights/PricesTable";

function Insights() {
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
            <Typography level="h2" textAlign="center" mb={2}>
                Price Insights
            </Typography>

            <PricesTable />
        </Box>
    );
}

export default Insights;
