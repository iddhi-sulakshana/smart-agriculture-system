import React from "react";
// Joy components
import { Box } from "@mui/joy";
// Local components
import MobileNavigation from "./navigation/MobileNavigation";
import DesktopNavigation from "./navigation/DesktopNavigation";
import CommonNavigation from "./navigation/CommonNavigation";

export default function Header() {
    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between",
            }}
        >
            {/* Desktop Navbar */}
            <DesktopNavigation />
            {/* Mobile Navbar */}
            <MobileNavigation />
            {/* Common Navbar in Right Side*/}
            <CommonNavigation />
        </Box>
    );
}
