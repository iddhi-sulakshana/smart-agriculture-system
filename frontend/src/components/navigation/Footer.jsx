import { Box, Button, Divider, Input, Link, Typography } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getURL } from "../../Utils/Url";

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    // mail send function
    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);
        // Send email logic here
        if (!email || !message) {
            toast.error("Please fill all fields.");
            setSending(false);
            return;
        }
        axios
            .request({
                method: "post",
                url: getURL("feedback"),
                data: {
                    email,
                    message,
                },
            })
            .then((res) => {
                toast.success("Email sent successfully.");
                setEmail("");
                setMessage("");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to send email.");
            })
            .finally(() => {
                setSending(false);
            });
    };
    return (
        <Box
            component="footer"
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "3fr 2.25fr 3fr", // Three columns for about, links, and subscription form
                },
                gap: 5,
                px: { xs: 2, sm: 10 },
                p: 2,
            }}
        >
            {/* About column */}
            <Box>
                <Typography color="primary" level="title-md">
                    About
                </Typography>
                <Typography textAlign="justify">
                    <b>AgriVista</b> leverages cutting-edge technologies such as
                    Artificial Intelligence (AI), Machine Learning (ML), and
                    robust digital platforms to provide real-time, actionable
                    data to farmers and agricultural stakeholders.
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
                <Typography color="primary" level="title-md">
                    Quick Links
                </Typography>
                <ul>
                    <li>
                        <Typography
                            component={NavLink}
                            sx={{
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            Home
                        </Typography>
                    </li>
                    <li>
                        {/* About */}
                        <Typography
                            component={NavLink}
                            sx={{
                                textDecoration: "none",
                            }}
                            to="/about"
                        >
                            About
                        </Typography>
                    </li>
                    {/* Terms and conditions */}
                    <li>
                        <Typography
                            component={Link}
                            href="/terms_conditions"
                            sx={{
                                textDecoration: "none",
                            }}
                        >
                            Terms & Conditions
                        </Typography>
                    </li>
                    {/* Privacy policy */}
                    <li>
                        <Typography
                            component={Link}
                            href="/privacy_policy"
                            sx={{
                                textDecoration: "none",
                            }}
                        >
                            Privacy Policy
                        </Typography>
                    </li>
                    {/* Help and support*/}
                    <li>
                        <Typography
                            component={Link}
                            href="/help_support"
                            sx={{
                                textDecoration: "none",
                            }}
                        >
                            Help & Support
                        </Typography>
                    </li>
                </ul>
            </Box>
            {/* Contact us */}
            <Box>
                <Typography color="primary" level="title-md">
                    Contact Us
                </Typography>
                <form onSubmit={sendEmail}>
                    <Input
                        placeholder="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Message"
                        fullWidth
                        rows={4}
                        sx={{ mb: 2 }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        color="primary"
                        fullWidth
                        type="submit"
                        loading={sending}
                    >
                        Send Email
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default Footer;
