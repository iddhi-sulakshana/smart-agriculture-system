import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { getURL } from "../../Utils/Url";

function SignInForm({ switchToSignup }) {
    const [fade, setFade] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(true);
    const { setToken } = UserContext();
    useEffect(() => {
        setFade(false);
    }, []);

    function handleSignIn(event) {
        event.preventDefault();
        // validate form
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            toast.error("Please enter a valid email address");
            return;
        }
        axios
            .request({
                method: "POST",
                url: getURL("users/signin"),
                data: {
                    email: email,
                    password: password,
                },
            })
            .then((response) => {
                // set token
                setToken(response.headers["x-auth-token"]);
                //  if remember is checked store token in local storage
                if (checked) {
                    localStorage.setItem(
                        "token",
                        response.headers["x-auth-token"]
                    );
                }
                // set to default
                setEmail("");
                setPassword("");
                setChecked(false);
            })
            .catch((error) => {
                toast.error(
                    error.response.data
                        ? error.response.data
                        : "An error occurred"
                );
            });
    }

    return (
        <Box
            sx={{
                transition: "opacity 0.3s, transform 0.4s",
                transform: fade ? "translateX(-25%)" : "translateX(0)",
                opacity: fade ? 0 : 1,
                display: "flex",
                flexDirection: "column",
                width: "clamp(800px, (769px - 100vw) * 999, 100%)",
                maxWidth: "100%",
            }}
        >
            <Box
                sx={{
                    my: "auto",
                    py: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 400,
                    maxWidth: "100%",
                    mx: "auto",
                    borderRadius: "sm",
                    "& form": {
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    },
                }}
            >
                <Stack gap={1} mb={2}>
                    <Typography level="h3">Sign in</Typography>
                    <Typography level="body-sm">New here? </Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            setFade(true);
                            switchToSignup();
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
                <Divider
                    sx={(theme) => ({
                        [theme.getColorSchemeSelector("light")]: {
                            color: "text.tertiary",
                            "--Divider-lineColor": "var(--joy-palette-divider)",
                        },
                    })}
                >
                    or
                </Divider>
                <Stack gap={4} mt={2}>
                    <form noValidate onSubmit={handleSignIn}>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Checkbox
                                    size="sm"
                                    label="Remember me"
                                    name="persistent"
                                    checked={checked}
                                    onChange={(e) => {
                                        setChecked(e.target.checked);
                                    }}
                                />
                                <Link
                                    level="title-sm"
                                    href="#replace-with-a-link"
                                >
                                    Forgot your password?
                                </Link>
                            </Box>
                            <Button type="submit" fullWidth>
                                Sign in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Box>
    );
}

export default SignInForm;
