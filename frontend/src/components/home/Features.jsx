import { Avatar, Box, Stack } from "@mui/joy";
import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const featuresData = [
    {
        title: "Free Shipping",
        description: "On orders over $100",
        icon: (
            <LocalShippingOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />
        ),
    },
    {
        title: "Always Fresh",
        description: "Products well packaged",
        icon: (
            <DinnerDiningOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />
        ),
    },
    {
        title: "Superior Quality",
        description: "Quality Products",
        icon: (
            <WorkspacePremiumOutlinedIcon
                sx={{ width: 50, height: 50, mb: 2 }}
            />
        ),
    },
    {
        title: "Support",
        description: "24/7 Support",
        icon: (
            <SupportAgentOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />
        ),
    },
];

function Features() {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            spacing={5}
            sx={{
                display: { xs: "none", sm: "flex" },
                my: 5,
                mx: 20,
            }}
        >
            {featuresData.map(({ title, description, icon }) => (
                <Box
                    key={title}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "100%",
                        height: "100%",
                        py: 2,
                        px: 1,
                        boxShadow: "md",
                    }}
                >
                    {icon}
                    <Box
                        component="h3"
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            mb: 1,
                        }}
                    >
                        {title}
                    </Box>
                    <Box
                        component="p"
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "normal",
                        }}
                    >
                        {description}
                    </Box>
                </Box>
            ))}
        </Stack>
    );
}

export default Features;
