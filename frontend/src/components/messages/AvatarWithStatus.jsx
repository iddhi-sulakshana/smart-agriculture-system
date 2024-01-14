import React from "react";
import { Badge, Avatar } from "@mui/joy";

function AvatarWithStatus({ online = false, size = "sm", src, ...other }) {
    return (
        <div>
            <Badge
                color={online ? "success" : "warning"}
                variant={online ? "solid" : "soft"}
                size={size}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeInset="4px 4px"
            >
                <Avatar size={size} src={src} {...other} />
            </Badge>
        </div>
    );
}

export default AvatarWithStatus;
