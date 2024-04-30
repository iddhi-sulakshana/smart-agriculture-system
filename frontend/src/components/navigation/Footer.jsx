import { Box, Button, Divider, Input, Link, Typography } from "@mui/joy";
import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "2fr 1fr 2fr", // Three columns for about, links, and subscription form
                },
                gap: 5,
                px: { xs: 2, sm: 10 },
                p: 2,
            }}
        >
            {/* About column */}
            <Box>
                <Typography variant="h6">About</Typography>
                <Typography>
                    The Smart Agriculture System leverages cutting-edge
                    technologies such as Artificial Intelligence (AI), Machine
                    Learning (ML), and robust digital platforms to provide
                    real-time, actionable data to farmers and agricultural
                    stakeholders.
                </Typography>
            </Box>
            {/* Links column */}
            <Box
                sx={{
                    pl: {
                        xs: 0,
                        md: 4,
                    },
                    borderLeft: {
                        xs: "0px",
                        md: "1px solid",
                    },
                    borderRight: {
                        xs: "0px",
                        md: "1px solid",
                    },
                    borderBottom: {
                        xs: "1px solid",
                        md: "0px",
                    },
                    borderTop: {
                        xs: "1px solid",
                        md: "0px",
                    },
                    borderColor: {
                        xs: "divider",
                        md: "divider",
                    },
                }}
            >
                <Typography variant="h6">Quick Links</Typography>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/market">Market</NavLink>
                    </li>
                </ul>
            </Box>
            {/* Subscription form column */}
            <Box>
                <Typography variant="h6">Subscribe</Typography>
                <form>
                    <Input
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button variant="contained" color="primary" fullWidth>
                        Subscribe
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Footer;
