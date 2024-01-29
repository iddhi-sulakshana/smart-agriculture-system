import { Carousel } from "antd";
import React from "react";
import { Button, Card, CardContent, CardCover, Typography } from "@mui/joy";
const desktopImages = [
    "/covers/lg/00001.jpg",
    "/covers/lg/00002.jpg",
    "/covers/lg/00003.jpg",
    "/covers/lg/00004.jpg",
];
const mobileImages = [
    "/covers/sm/00001.jpg",
    "/covers/sm/00002.jpg",
    "/covers/sm/00003.jpg",
    "/covers/sm/00004.jpg",
];
function CarouselCover() {
    return (
        <Carousel autoplay speed={1000} infinite>
            {desktopImages.map((step, index) => (
                <Card
                    key={index}
                    variant="solid"
                    invertedColors
                    sx={{
                        minHeight: {
                            xs: 300,
                            md: 500,
                        },
                        width: "100%",
                    }}
                >
                    <CardCover>
                        <picture>
                            {/* Add source elements for different image sources */}
                            <source
                                media="(max-width: 600px)"
                                srcSet={`${mobileImages[index]} 1x`}
                            />
                            <img
                                src={step}
                                alt="Iceland"
                                loading="lazy"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "fill",
                                }}
                            />
                        </picture>
                    </CardCover>
                    <CardCover
                        sx={{
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 50px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 100px)",
                        }}
                    />
                    {/* 
                    <CardContent
                        sx={{
                            minHeight: {
                                xs: 300,
                                md: 500,
                            },
                            backdropFilter: "blur(0px)",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            level="h6"
                            textColor="common.white"
                            fontWeight="light"
                            textAlign="center"
                        >
                            All markets product
                        </Typography>
                        <Typography
                            level="h1"
                            textColor="common.white"
                            textAlign="center"
                        >
                            Fresh and Healthy Vegetables and Fruits
                        </Typography>
                        <Typography
                            level="h4"
                            textColor="common.white"
                            fontWeight="light"
                            textAlign="center"
                        >
                            We deliver organic vegetables & fruits
                        </Typography>
                        <Button
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            Shop Now
                        </Button>
                    </CardContent> */}
                </Card>
            ))}
        </Carousel>
    );
}

export default CarouselCover;
