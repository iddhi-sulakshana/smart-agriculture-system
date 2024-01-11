import React from "react";
// Joy components
import { Box } from "@mui/joy";
// Local components
import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import CommonNavigation from "./CommonNavigation";

export default function Header() {
    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between",
                px: { xs: 0, sm: 10 },
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
