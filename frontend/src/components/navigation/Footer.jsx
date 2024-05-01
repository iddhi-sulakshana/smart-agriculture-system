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
                <Typography color="neutral" level="title-md">
                    About
                </Typography>
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
                    "& ul": {
                        listStyle: "none",
                        padding: 0,
                    },
                    "& li": {
                        mb: 1,
                    },
                }}
            >
                <Typography color="neutral" level="title-md">
                    Quick Links
                </Typography>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/market">Market</NavLink>
                    </li>
                </ul>
            </Box>
            {/* Contact us */}
            <Box>
                <Typography color="neutral" level="title-md">
                    Contact Us
                </Typography>
                <form>
                    <Input
                        placeholder="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        type="email"
                    />
                    <Input
                        placeholder="Message"
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <Button color="primary" fullWidth>
                        Send Email
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Footer;
