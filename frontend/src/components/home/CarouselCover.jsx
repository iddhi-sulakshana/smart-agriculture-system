import { Carousel } from "antd";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardCover } from "@mui/joy";
import useGetCovers from "../../hooks/useGetCovers";
import { getRootURL } from "../../Utils/Url";

function CarouselCover() {
    const covers = useGetCovers();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Carousel
                autoplay
                speed={1000}
                infinite
                effect="fade"
                autoplaySpeed={5000}
            >
                <Card
                    variant="solid"
                    invertedColors
                    sx={{
                        minHeight: {
                            xs: 300,
                            md: 500,
                        },
                        width: "100%",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <CardCover>
                        <motion.picture
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <source
                                media="(max-width: 600px)"
                                srcSet="/coverM.png 1x"
                            />
                            <img
                                src="/coverL.png"
                                alt="Welcome Text"
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "fill",
                                }}
                            />
                        </motion.picture>
                    </CardCover>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                        }}
                    />
                </Card>

                {covers.map((cover) => (
                    <Card
                        key={cover._id}
                        variant="solid"
                        invertedColors
                        sx={{
                            minHeight: {
                                xs: 300,
                                md: 500,
                            },
                            width: "100%",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <CardCover>
                            <motion.picture
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <source
                                    media="(max-width: 600px)"
                                    srcSet={`${getRootURL(cover?.mobileCover)} 1x`}
                                />
                                <img
                                    src={getRootURL(cover?.desktopCover)}
                                    alt="Cover"
                                    loading="lazy"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "fill",
                                    }}
                                />
                            </motion.picture>
                        </CardCover>
                        <CardCover
                            sx={{
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 50px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)",
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                            }}
                        />
                    </Card>
                ))}
            </Carousel>
        </motion.div>
    );
}

export default CarouselCover;