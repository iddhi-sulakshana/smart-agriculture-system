import { Button, Typography } from "@mui/joy";
import { Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Result
            status={404}
            title={<Typography level="h3">404</Typography>}
            subTitle={
                <Typography level="h4">
                    Sorry, the page you visited does not exist.
                </Typography>
            }
            extra={
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Back Home
                </Button>
            }
        />
    );
}

export default NotFound;
