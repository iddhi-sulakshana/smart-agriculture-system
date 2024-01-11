import { Avatar, Badge } from "@mui/joy";
import React from "react";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import StorefrontIcon from "@mui/icons-material/Storefront";

function CustomAvatar({ role, ...others }) {
    return (
        <Badge
            variant="soft"
            color="primary"
            badgeContent={
                role === "farmer" ? (
                    <AgricultureIcon />
                ) : role === "wholeseller" ? (
                    <StorefrontIcon />
                ) : null
            }
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeInset="14%"
        >
            <Avatar {...others} />
        </Badge>
    );
}

export default CustomAvatar;
