import { Button, Typography } from "@mui/joy";
import { Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Transportation() {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            title={<Typography level="h3">302</Typography>}
            subTitle={
                <Typography level="h4">
                    Sorry, This page is in under construction.
                </Typography>
            }
            extra={
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Go Back
                </Button>
            }
        />
    );
}

export default Transportation;
