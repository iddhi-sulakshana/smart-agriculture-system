
import { Box, Divider } from "@mui/joy";
import React from "react";
import { motion } from "framer-motion";
import CarouselCover from "../components/home/CarouselCover";
import Features from "../components/home/Features";
import Featured from "../components/home/Featured";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
};

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

function Home() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Box
                sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    my: 2,
                    px: {
                        xs: 0,
                        md: 10,
                    },
                    // Fix scrolling issue
                    overflowX: "hidden",
                    overflowY: "auto",
                }}
            >
                {/* Hero Section - Carousel */}
                <motion.div variants={sectionVariants}>
                    <CarouselCover />
                </motion.div>

                {/* Features Section */}
                <motion.div variants={sectionVariants}>
                    <Features />
                </motion.div>

                {/* Divider with fade */}
                <motion.div
                    variants={sectionVariants}
                    style={{ margin: "2rem 0" }}
                >
                    <Divider />
                </motion.div>

                {/* Featured Section */}
                <motion.div variants={sectionVariants}>
                    <Featured />
                </motion.div>
            </Box>
        </motion.div>
    );
}

export default Home;
