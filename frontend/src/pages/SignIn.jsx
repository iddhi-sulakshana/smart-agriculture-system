import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "../components/signin/SignInForm";
import SignUpForm from "../components/signin/SignUpForm";
import UserContext from "../contexts/UserContext";

function SignIn() {
    const { token } = UserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/profile");
        }
    }, [token]);
    const [active, setActive] = useState("signin");
    const switchToSignup = () => {
        setTimeout(() => {
            setActive("signup");
        }, 300);
    };
    const switchToSignin = () => {
        setTimeout(() => {
            setActive("signin");
        }, 300);
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
