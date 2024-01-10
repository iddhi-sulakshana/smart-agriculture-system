import { Box } from "@mui/joy";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignIn/SignInForm";
import SignUpForm from "../components/SignIn/SignUpForm";

function SignIn() {
    const [active, setActive] = useState("signin");
    const switchToSignup = () => {
        setActive("signup");
    };
    const switchToSignin = () => {
        setActive("signin");
    };
    return (
        <>
            <Box
                sx={{
                    transition: "width 0.4s",
                    transitionDelay: "calc(0.4s + 0.1s)",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 4,
                }}
            >
                {(active === "signin" && (
                    <SignInForm switchToSignup={switchToSignup} />
                )) || <SignUpForm switchToSignin={switchToSignin} />}
            </Box>
        </>
    );
}

export default SignIn;
