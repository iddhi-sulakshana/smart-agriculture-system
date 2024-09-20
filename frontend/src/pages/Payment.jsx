import { Box } from "@mui/joy";
import React from "react";

const Payment = () => {
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
            <div>Payment</div>
        </Box>
    );
};

export default Payment;
