import { Box, Typography, Divider } from "@mui/joy";
import React from "react";

function HelpSupport() {
    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 3,
                px: {
                    xs: 2,
                    md: 10,
                },
            }}
        >
            <Typography level="h2" textAlign="center" mb={2}>
                Getting Started with AgriVista
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography level="h3" mb={2}>
                1. Creating an Account
            </Typography>
            <Typography level="body1" mb={2}>
                To access AgriVista's features, you first need to create an
                account: - Visit the homepage and click on the "Sign Up" button.
                - Enter your email, create a password, and fill in basic
                details. - Verify your email address via the confirmation link
                sent to your inbox.
            </Typography>

            <Typography level="h3" mb={2}>
                2. Exploring the Dashboard
            </Typography>
            <Typography level="body1" mb={2}>
                After logging in, you'll be taken to the dashboard where you
                can: - View personalized crop recommendations based on
                historical trends and environmental data. - Access real-time
                market price predictions for various crops. - Navigate to the
                marketplace to connect with buyers or sellers directly.
            </Typography>

            <Typography level="h3" mb={2}>
                3. Setting Up Crop Recommendations
            </Typography>
            <Typography level="body1" mb={2}>
                To receive personalized crop recommendations: - Go to the "Crop
                Recommendations" tab on the dashboard. - Input relevant
                information like soil type, climate data, and the region. -
                Click "Get Recommendations" to see which crops are best suited.
            </Typography>

            <Typography level="h3" mb={2}>
                4. Using the Marketplace
            </Typography>
            <Typography level="body1" mb={2}>
                You can connect with other stakeholders via the digital
                marketplace: - Visit the "Marketplace" section on your
                dashboard. - Browse available crops or services, or post your
                own. - Use the messaging feature to negotiate and finalize deals
                securely.
            </Typography>

            <Typography level="h3" mb={2}>
                5. Managing Your Profile
            </Typography>
            <Typography level="body1" mb={2}>
                Ensure your account details are accurate and up-to-date: - Click
                on your profile icon and select "Account Settings." - Update
                contact information, passwords, and other preferences as needed.
                - Configure notification settings to receive alerts about market
                trends and recommendations.
            </Typography>

            <Typography level="h3" mb={2}>
                6. Need Assistance?
            </Typography>
            <Typography level="body1" mb={2}>
                If you need further help navigating AgriVista or setting up
                features, reach out to our support team at
                [support@agrivista.com].
            </Typography>
        </Box>
    );
}

export default HelpSupport;
