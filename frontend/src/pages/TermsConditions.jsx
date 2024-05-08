import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from "@mui/joy";
import React from "react";

function TermsAndConditions() {
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
                Terms and Conditions
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography level="body-md" mb={4}>
                Welcome to AgriVista! These Terms and Conditions outline the
                rules and regulations governing the use of our platform and
                services. By accessing and using AgriVista, you agree to abide
                by these terms. Please read them carefully. If you do not agree,
                we advise refraining from using our website and services. The
                following sections will explain the rights, obligations, and
                limitations that govern your relationship with us.
            </Typography>

            <Accordion defaultExpanded>
                <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography level="title-md">1. Introduction</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        Welcome to AgriVista! These Terms and Conditions outline
                        the rules and regulations for using our website and
                        services. By accessing or using our services, you agree
                        to comply with these terms.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography level="title-md">
                        2. Intellectual Property
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        All content, graphics, and intellectual property found
                        on AgriVista are owned by or licensed to us. You must
                        not reproduce, distribute, or use any content for
                        commercial purposes without our explicit consent.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <Typography level="title-md">3. User Accounts</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        To access certain services, you may be required to
                        create a user account. You agree to provide accurate and
                        up-to-date information during registration. You are
                        responsible for maintaining the confidentiality of your
                        account credentials.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    aria-controls="panel4-content"
                    id="panel4-header"
                >
                    <Typography level="title-md">4. Use of Services</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        You agree not to misuse our services by violating any
                        applicable laws, uploading harmful content, or engaging
                        in unauthorized commercial activities. We reserve the
                        right to terminate accounts that violate these
                        conditions.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    aria-controls="panel5-content"
                    id="panel5-header"
                >
                    <Typography level="title-md">5. Liability</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        While we strive to provide accurate and reliable
                        information, AgriVista does not guarantee the
                        completeness or accuracy of the data. We shall not be
                        held liable for any direct or indirect damages resulting
                        from the use of our services.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    aria-controls="panel6-content"
                    id="panel6-header"
                >
                    <Typography level="title-md">
                        6. Changes to Terms
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        AgriVista reserves the right to modify these terms at
                        any time. Users will be notified of significant changes,
                        and continued use of the services will signify
                        acceptance of the revised terms.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    aria-controls="panel7-content"
                    id="panel7-header"
                >
                    <Typography level="title-md">
                        7. Contact Information
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography level="body-md">
                        If you have any questions regarding these terms, feel
                        free to contact us at [contact@agrivista.com].
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default TermsAndConditions;
