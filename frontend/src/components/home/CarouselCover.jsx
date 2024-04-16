import { Carousel } from "antd";
import React from "react";
import { Card, CardCover } from "@mui/joy";
import useGetCovers from "../../hooks/useGetCovers";
import { getRootURL } from "../../Utils/Url";
function CarouselCover() {
    const covers = useGetCovers();
    return (
        <Carousel autoplay speed={1000} infinite>
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
                    }}
                >
                    <CardCover>
                        <picture>
                            {/* Add source elements for different image sources */}
                            <source
                                media="(max-width: 600px)"
                                srcSet={`${getRootURL(cover?.mobileCover)} 1x`}
                            />
                            <img
                                src={getRootURL(cover?.desktopCover)}
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
                </Card>
            ))}
        </Carousel>
    );
}

export default CarouselCover;
