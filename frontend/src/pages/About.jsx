import { Box, Typography, Divider, Avatar, Grid } from "@mui/joy";
import React from "react";

function About() {
    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Typography level="h2" textAlign="center" mb={2}>
                About AgriVista
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} alignItems="center">
                <Grid xs={12} md={6}>
                    <Typography level="body1">
                        AgriVista leverages cutting-edge technologies like
                        Artificial Intelligence (AI), Machine Learning (ML), and
                        robust digital platforms to provide real-time,
                        actionable data to farmers and agricultural
                        stakeholders. By harnessing this data, AgriVista
                        empowers users with advanced crop recommendations,
                        accurate market price predictions, and a transparent
                        digital marketplace to connect directly with buyers and
                        sellers.
                    </Typography>
                    <Typography level="body1" mt={2}>
                        Our mission is to revolutionize agriculture through
                        technology. We help farmers make data-driven decisions
                        that increase productivity, profitability, and
                        sustainable farming practices, reducing the impact of
                        climate change and market volatility.
                    </Typography>
                </Grid>
                <Grid xs={12} md={6} display="flex" justifyContent="center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1563986768609-322da13575f3"
                        alt="AgriVista Overview"
                        sx={{
                            width: 300,
                            height: 300,
                            borderRadius: "50%",
                            boxShadow: "md",
                        }}
                    />
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />

            <Typography level="h3" textAlign="center" mb={2}>
                Meet Our Visionary Leader
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid
                    xs={12}
                    sm={4}
                    md={3}
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                >
                    <Avatar
                        src="/profile.jpg"
                        alt="Founder and Developer"
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            boxShadow: "md",
                        }}
                    />
                    <Typography level="body-lg" mt={1}>
                        Iddhi Dasanayaka, Founder & Developer
                    </Typography>
                    <Typography level="body-sm" mt={1}>
                        Dedicated to reshaping the agricultural landscape, Iddhi
                        Dasanayaka combines extensive expertise in AI and ML
                        with a passion for sustainable farming.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default About;
