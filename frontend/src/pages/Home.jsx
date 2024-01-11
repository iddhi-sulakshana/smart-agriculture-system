import { Box, Button, Card, CardCover } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
const images = [
    "https://images.unsplash.com/photo-1682687221038-404cb8830901?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1682695794947-17061dc284dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
function Home() {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: 300,
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Carousel autoplay dotPosition="top" speed={1000} infinite>
                {images.map((step, index) => (
                    <Card
                        key={index}
                        variant="solid"
                        invertedColors
                        sx={{
                            minHeight: 300,
                            width: "100%",
                            borderRadius: "md",
                            boxShadow: "md",
                        }}
                    >
                        <CardCover>
                            <img src={step} alt="Iceland" loading="lazy" />
                        </CardCover>
                    </Card>
                ))}
            </Carousel>
        </Box>
    );
}

export default Home;
