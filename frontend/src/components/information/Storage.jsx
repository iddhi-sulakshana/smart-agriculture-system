import { Box, Button, Typography } from "@mui/joy";
import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

function Storage() {
    const navigate = useNavigate();
    return (
        <Box>
            {/* Title */}
            <Typography level="h2" textAlign="center">
                Storage
            </Typography>
            <Result
                status="403"
                title="302"
                subTitle="Sorry, This page under construction."
                extra={
                    <Button
                        onClick={() => {
                            navigate("../");
                        }}
                    >
                        Go Back
                    </Button>
                }
            />
        </Box>
    );
}

export default Storage;
