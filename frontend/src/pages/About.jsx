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
                <Grid xs={12} sm={4} md={3} textAlign="center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1506817604249-e6d4f9f26c08"
                        alt="Founder and Developer"
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            boxShadow: "md",
                        }}
                    />
                    <Typography level="body2" mt={1}>
                        [Your Name], Founder & Developer
                    </Typography>
                    <Typography level="body2" mt={1}>
                        Dedicated to reshaping the agricultural landscape, [Your
                        Name] combines extensive expertise in AI and ML with a
                        passion for sustainable farming.
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid xs={12} sm={4} md={3} textAlign="center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
                        alt="Team Member 1"
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            boxShadow: "sm",
                        }}
                    />
                    <Typography level="body2" mt={1}>
                        Jane Doe, Lead Developer
                    </Typography>
                </Grid>
                <Grid xs={12} sm={4} md={3} textAlign="center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                        alt="Team Member 2"
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            boxShadow: "sm",
                        }}
                    />
                    <Typography level="body2" mt={1}>
                        John Smith, UI/UX Designer
                    </Typography>
                </Grid>
                <Grid xs={12} sm={4} md={3} textAlign="center">
                    <Avatar
                        src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7"
                        alt="Team Member 3"
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            boxShadow: "sm",
                        }}
                    />
                    <Typography level="body2" mt={1}>
                        Alex Johnson, Project Manager
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default About;
