import { Box, Grid, Typography } from "@mui/joy";
import React from "react";
import { motion } from "framer-motion";
import ClickableCard from "../common/ClickableCard";
import useGetFeatured from "../../hooks/useGetFeatured";

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardItemVariants = {
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

function Featured() {
    const featured = useGetFeatured();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                my: 5,
            }}
        >
            <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <Typography level="h2">Featured</Typography>
            </motion.div>

            <motion.div
                variants={headerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1 }}
            >
                <Typography level="body-md">
                    Far far away, behind the word mountains, far from the countries
                    Vokalia and Consonantia
                </Typography>
            </motion.div>

            <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{ width: "100%" }}
            >
                <Grid
                    container
                    spacing={6}
                    justifyContent={{ xs: "center", md: "space-between" }}
                    mt={3}
                    sx={{ flexGrow: 1 }}
                >
                    {featured.length === 0 &&
                        Array.from({ length: 5 }).map((_, index) => (
                            <motion.div key={index} variants={cardItemVariants}>
                                <ClickableCard loading />
                            </motion.div>
                        ))}
                    {featured.map((item) => (
                        <motion.div key={item._id} variants={cardItemVariants}>
                            <ClickableCard
                                id={item._id}
                                loading={false}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                location={item.location.name}
                                badge={{ name: "Featured", color: "primary" }}
                                category={item.category}
                            />
                        </motion.div>
                    ))}
                </Grid>
            </motion.div>
        </Box>
    );
}

export default Featured;