import { Carousel } from "antd";
import React from "react";
import { Button, Card, CardContent, CardCover, Typography } from "@mui/joy";
const images = ["/00001.jpg", "/00002.jpg", "/00003.jpg", "/00004.jpg"];
function CarouselCover() {
    return (
        <Carousel autoplay speed={1000} infinite>
            {images.map((step, index) => (
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
                        borderRadius: "md",
                        boxShadow: "md",
                    }}
                >
                    <CardCover>
                        <img src={step} alt="Iceland" loading="lazy" />
                    </CardCover>
                    <CardCover
                        sx={{
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                        }}
                    />
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
                    </CardContent>
                </Card>
            ))}
        </Carousel>
    );
}

export default CarouselCover;
