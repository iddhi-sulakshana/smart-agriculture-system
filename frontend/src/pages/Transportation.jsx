import { Button } from "@mui/joy";
import { Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Transportation() {
    const navigate = useNavigate();
    return (
        <Result
            status="403"
            title="302"
            subTitle="Sorry, This page under construction."
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
