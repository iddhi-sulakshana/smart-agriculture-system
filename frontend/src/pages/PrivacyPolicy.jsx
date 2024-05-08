import { Box, Typography, Divider } from "@mui/joy";
import React from "react";

function PrivacyPolicy() {
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
                Privacy Policy
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography level="title-md" mb={2}>
                1. Introduction
            </Typography>
            <Typography level="body-md" mb={2}>
                AgriVista values your privacy and is committed to protecting
                your personal data. This Privacy Policy describes how we
                collect, use, disclose, and store information about our users.
                By using AgriVista, you consent to the terms described here.
            </Typography>

            <Typography level="title-md" mb={2}>
                2. Information We Collect
            </Typography>
            <Typography level="body-md" mb={2}>
                We collect various types of information, including: - **Personal
                Information:** Your name, email, contact details, and other
                identifying data provided during account registration. - **Usage
                Data:** Information on how you interact with our services,
                including IP address, browser type, and device details. -
                **Cookies and Tracking:** Small data files that remember your
                preferences and improve user experience.
            </Typography>

            <Typography level="title-md" mb={2}>
                3. How We Use Your Information
            </Typography>
            <Typography level="body-md" mb={2}>
                The information collected is used to: - Provide and maintain the
                platform. - Personalize your experience and offer tailored
                content. - Monitor and analyze user activity for performance
                improvements. - Communicate updates, offers, and announcements
                via email.
            </Typography>

            <Typography level="title-md" mb={2}>
                4. Sharing Your Information
            </Typography>
            <Typography level="body-md" mb={2}>
                We do not sell or rent your personal information to third
                parties. However, we may share data with trusted partners and
                service providers to: - Analyze user activity for internal
                reporting and performance evaluation. - Process payments
                securely and efficiently. - Comply with legal obligations or
                protect AgriVista's legal rights.
            </Typography>

            <Typography level="title-md" mb={2}>
                5. Security
            </Typography>
            <Typography level="body-md" mb={2}>
                We employ industry-standard security measures to protect your
                personal information. While we strive to safeguard your data, no
                electronic storage method is 100% secure. Please use AgriVista
                at your discretion.
            </Typography>

            <Typography level="title-md" mb={2}>
                6. Children's Privacy
            </Typography>
            <Typography level="body-md" mb={2}>
                AgriVista is not intended for use by children under 13. We do
                not knowingly collect personal data from children. If you
                believe a child has provided us with personal information,
                please contact us for removal.
            </Typography>

            <Typography level="title-md" mb={2}>
                7. Changes to This Policy
            </Typography>
            <Typography level="body-md" mb={2}>
                AgriVista reserves the right to update this Privacy Policy as
                needed. Users will be notified of significant changes, and
                continued use of the platform constitutes acceptance of the
                revised policy.
            </Typography>

            <Typography level="title-md" mb={2}>
                8. Contact Us
            </Typography>
            <Typography level="body-md" mb={2}>
                If you have any questions regarding this Privacy Policy or need
                to contact us for any reason, reach out at
                [privacy@agrivista.com].
            </Typography>
        </Box>
    );
}

export default PrivacyPolicy;
