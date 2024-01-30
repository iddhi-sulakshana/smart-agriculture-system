import { Button, Box, Typography } from "@mui/joy";
import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

function Regulations() {
    const navigate = useNavigate();
    return (
        <Box>
            {/* Title */}
            <Typography level="h2" textAlign="center">
                Regulations
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

export default Regulations;
