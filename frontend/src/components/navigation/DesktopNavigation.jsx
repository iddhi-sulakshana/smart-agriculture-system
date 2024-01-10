import { Avatar, Button, IconButton, Stack } from "@mui/joy";
import React from "react";

function DesktopNavigation() {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ display: { xs: "none", sm: "flex" } }}
        >
            <IconButton
                size="md"
                variant="none"
                sx={{
                    display: { xs: "none", sm: "inline-flex" },
                }}
            >
                <Avatar src="/logo.png" color="none" />
            </IconButton>
            <Button
                variant="plain"
                color="neutral"
                aria-pressed="true"
                component="a"
                href="/joy-ui/getting-started/templates/email/"
                size="sm"
                sx={{ alignSelf: "center" }}
            >
                Email
            </Button>
            <Button
                variant="plain"
                color="neutral"
                component="a"
                href="/joy-ui/getting-started/templates/team/"
                size="sm"
                sx={{ alignSelf: "center" }}
            >
                Team
            </Button>
            <Button
                variant="plain"
                color="neutral"
                component="a"
                href="/joy-ui/getting-started/templates/files/"
                size="sm"
                sx={{ alignSelf: "center" }}
            >
                Files
            </Button>
        </Stack>
    );
}

export default DesktopNavigation;
