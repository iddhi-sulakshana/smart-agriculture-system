import {
    AspectRatio,
    Box,
    Button,
    Card,
    CardContent,
    CardCover,
    CardOverflow,
    Chip,
    Grid,
    Link,
    Typography,
} from "@mui/joy";
import React from "react";

function Featured() {
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
            <Typography level="h2">Featured</Typography>
            <Typography level="body-md">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia
            </Typography>
            <Grid container spacing={2} sx={{ mt: 5, width: "100%" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid xs={12} md={3} key={item}>
                        <Card sx={{ boxShadow: "md" }}>
                            <CardOverflow>
                                <AspectRatio ratio="2">
                                    <img
                                        src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                                        srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="body-xs">
                                    Bluetooth Headset
                                </Typography>
                                <Link
                                    href="#product-card"
                                    fontWeight="md"
                                    color="neutral"
                                    textColor="text.primary"
                                    overlay
                                >
                                    Super Rockez A400
                                </Link>
                                <Typography
                                    level="title-lg"
                                    sx={{ mt: 1, fontWeight: "xl" }}
                                    endDecorator={
                                        <Chip
                                            component="span"
                                            size="sm"
                                            variant="soft"
                                            color="success"
                                        >
                                            Lowest price
                                        </Chip>
                                    }
                                >
                                    2,900 THB
                                </Typography>
                                <Typography level="body-sm">
                                    (Only <b>7</b> left in stock!)
                                </Typography>
                            </CardContent>
                            <CardOverflow>
                                <Button
                                    variant="solid"
                                    color="success"
                                    size="lg"
                                >
                                    Add to cart
                                </Button>
                            </CardOverflow>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Featured;
