import React from "react";
// Joy components
import { Box, Sheet } from "@mui/joy";

function Root(props) {
    return (
        <Box
            {...props}
            sx={[
                {
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "minmax(64px, 200px) minmax(450px, 1fr)",
                        md: "minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)",
                    },
                    gridTemplateRows: "64px 1fr",
                    minHeight: "100vh",
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

function Header(props) {
    return (
        <Box
            component="header"
            className="Header"
            {...props}
            sx={[
                {
                    p: 2,
                    gap: 2,
                    bgcolor: "background.surface",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gridColumn: "1 / -1",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    position: "sticky",
                    top: 0,
                    zIndex: 1100,
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

function SideDrawer({ onClose, children, ...other }) {
    return (
        <Box
            {...other}
            sx={[
                {
                    position: "fixed",
                    zIndex: 1200,
                    width: "100%",
                    height: "100%",
                },
                ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
            ]}
        >
            <Box
                role="button"
                onClick={onClose}
                sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: (theme) =>
                        `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
                }}
            />
            <Sheet
                sx={{
                    minWidth: 256,
                    width: "max-content",
                    height: "100%",
                    p: 2,
                    boxShadow: "lg",
                    bgcolor: "background.surface",
                }}
            >
                {children}
            </Sheet>
        </Box>
    );
}

function Main(props) {
    return (
        <Box
            component="main"
            className="Main"
            {...props}
            sx={[
                { p: 2 },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

export default { Root, Header, SideDrawer, Main };
