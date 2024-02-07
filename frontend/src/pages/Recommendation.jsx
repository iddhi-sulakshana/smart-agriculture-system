import { Box, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import RecommendForm from "../components/recommendation/RecommendForm";
import ResultModal from "../components/recommendation/ResultModal";

function Recommendation() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open) {
            setTimeout(() => setLoading(false), 3000);
        } else {
            setLoading(true);
        }
    }, [open]);

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
                Crop Recommendation
            </Typography>
            <RecommendForm setOpen={setOpen} />
            <ResultModal open={open} setOpen={setOpen} loading={loading} />
        </Box>
    );
}

export default Recommendation;
