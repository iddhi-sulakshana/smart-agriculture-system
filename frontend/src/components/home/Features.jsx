import { Box, Stack } from "@mui/joy";
import React from "react";
import { motion } from "framer-motion";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const featuresData = [
    {
        title: "Free Shipping",
        description: "On orders over $100",
        icon: <LocalShippingOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />,
    },
    {
        title: "Always Fresh",
        description: "Products well packaged",
        icon: <DinnerDiningOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />,
    },
    {
        title: "Superior Quality",
        description: "Quality Products",
        icon: <WorkspacePremiumOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />,
    },
    {
        title: "Support",
        description: "24/7 Support",
        icon: <SupportAgentOutlinedIcon sx={{ width: 50, height: 50, mb: 2 }} />,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

function Features() {
    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                spacing={5}
                sx={{
                    display: { xs: "none", sm: "flex" },
                    my: 5,
                    mx: 20,
                    // Fix scrolling
                    overflowX: "visible",
                    overflowY: "visible",
                }}
            >
                {featuresData.map(({ title, description, icon }, index) => (
                    <motion.div
                        key={title}
                        variants={cardVariants}
                        whileHover={{
                            y: -10,
                            scale: 1.05,
                            transition: { duration: 0.3, ease: "easeOut" },
                        }}
                        whileTap={{
                            scale: 0.98,
                            transition: { duration: 0.1 },
                        }}
                        style={{ width: "100%" }}
                    >
                        <Box
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
                                borderRadius: "12px",
                                cursor: "pointer",
                                transition: "box-shadow 0.3s ease",
                                "&:hover": {
                                    boxShadow: "xl",
                                },
                            }}
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 10,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                {icon}
                            </motion.div>
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
                    </motion.div>
                ))}
            </Stack>
        </motion.div>
    );
}

export default Features;
