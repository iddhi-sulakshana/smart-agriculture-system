import { Box, Button, Input, Link, Typography } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getURL } from "../../Utils/Url";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

const linkVariants = {
    rest: { x: 0, color: "inherit" },
    hover: {
        x: 5,
        transition: { duration: 0.2 },
    },
};

const buttonVariants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
};

const inputVariants = {
    focus: {
        scale: 1.01,
        boxShadow: "0 4px 12px rgba(147, 51, 234, 0.2)",
        transition: { duration: 0.2 },
    },
};

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    // mail send function
    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);

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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <Box
                component="footer"
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "3fr 2.25fr 3fr",
                    },
                    gap: 5,
                    px: { xs: 2, sm: 10 },
                    p: 2,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Animated background gradient */}
                <motion.div
                    animate={{
                        background: [
                            "linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, transparent 50%)",
                            "linear-gradient(45deg, transparent 50%, rgba(147, 51, 234, 0.05) 100%)",
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                {/* About column */}
                <motion.div variants={columnVariants} style={{ position: "relative", zIndex: 1 }}>
                    <Box>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Typography color="primary" level="title-md" sx={{ mb: 2 }}>
                                About
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography textAlign="justify">
                                <b>AgriVista</b> leverages cutting-edge technologies such as
                                Artificial Intelligence (AI), Machine Learning (ML), and
                                robust digital platforms to provide real-time, actionable
                                data to farmers and agricultural stakeholders.
                            </Typography>
                        </motion.div>
                    </Box>
                </motion.div>

                {/* Links column */}
                <motion.div variants={columnVariants} style={{ position: "relative", zIndex: 1 }}>
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
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Typography color="primary" level="title-md" sx={{ mb: 2 }}>
                                Quick Links
                            </Typography>
                        </motion.div>
                        <ul>
                            {[
                                { to: "/", label: "Home" },
                                { to: "/about", label: "About" },
                                { to: "/terms_conditions", label: "Terms & Conditions" },
                                { to: "/privacy_policy", label: "Privacy Policy" },
                                { to: "/help_support", label: "Help & Support" },
                            ].map((link, index) => (
                                <motion.li
                                    key={link.to}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <motion.div
                                        variants={linkVariants}
                                        initial="rest"
                                        whileHover="hover"
                                    >
                                        <Typography
                                            component={link.to.startsWith("/") ? NavLink : Link}
                                            to={link.to.startsWith("/") ? link.to : undefined}
                                            href={!link.to.startsWith("/") ? link.to : undefined}
                                            sx={{
                                                textDecoration: "none",
                                                display: "inline-block",
                                                position: "relative",
                                                "&::after": {
                                                    content: '""',
                                                    position: "absolute",
                                                    bottom: -2,
                                                    left: 0,
                                                    width: "0%",
                                                    height: "2px",
                                                    background: "currentColor",
                                                    transition: "width 0.3s ease",
                                                },
                                                "&:hover::after": {
                                                    width: "100%",
                                                },
                                            }}
                                        >
                                            {link.label}
                                        </Typography>
                                    </motion.div>
                                </motion.li>
                            ))}
                        </ul>
                    </Box>
                </motion.div>

                {/* Contact us */}
                <motion.div variants={columnVariants} style={{ position: "relative", zIndex: 1 }}>
                    <Box>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Typography color="primary" level="title-md" sx={{ mb: 2 }}>
                                Contact Us
                            </Typography>
                        </motion.div>
                        <form onSubmit={sendEmail}>
                            <motion.div
                                animate={focusedInput === "email" ? "focus" : "rest"}
                                variants={inputVariants}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Email"
                                    fullWidth
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedInput("email")}
                                    onBlur={() => setFocusedInput(null)}
                                    sx={{
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                animate={focusedInput === "message" ? "focus" : "rest"}
                                variants={inputVariants}
                                style={{ marginBottom: "1rem" }}
                            >
                                <Input
                                    placeholder="Message"
                                    fullWidth
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onFocus={() => setFocusedInput("message")}
                                    onBlur={() => setFocusedInput(null)}
                                    sx={{
                                        minHeight: "100px",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                variants={buttonVariants}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Button
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    loading={sending}
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            width: "0",
                                            height: "0",
                                            borderRadius: "50%",
                                            background: "rgba(255, 255, 255, 0.2)",
                                            transform: "translate(-50%, -50%)",
                                            transition: "width 0.6s, height 0.6s",
                                        },
                                        "&:hover::before": {
                                            width: "300px",
                                            height: "300px",
                                        },
                                    }}
                                >
                                    <motion.span
                                        animate={sending ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                                        transition={{ duration: 1, repeat: sending ? Infinity : 0 }}
                                    >
                                        {sending ? "Sending..." : "Send Email"}
                                    </motion.span>
                                </Button>
                            </motion.div>
                        </form>
                    </Box>
                </motion.div>
            </Box>
        </motion.div>
    );
}

export default Footer;