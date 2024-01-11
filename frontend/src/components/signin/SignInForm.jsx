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
import SnackBarContext from "../../contexts/SnackBarContext";

function SignInForm({ switchToSignup }) {
    const [fade, setFade] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const { setToken } = UserContext();
    const { showMessage } = SnackBarContext();
    useEffect(() => {
        setFade(false);
    }, []);

    function handleSignIn(event) {
        event.preventDefault();
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmMTQxNjZkNGY5MmY3MTI4NmNlYzMiLCJpYXQiOjE1MTYyMzgwMjB9.L42I5wm0NY7naR_5nt0qof-TqB4NYBdLCA3hHMAS_rA";

        // validate form
        if (!email || !password) {
            showMessage("error", "Please fill in all fields");
            return;
        }
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
            showMessage("error", "Please enter a valid email address");
            return;
        }

        // TODO: Send request to backend to verify user credentials
        // TODO: If successful, set token in local storage
        localStorage.setItem("token", token);
        setToken(token);
        // TODO: If unsuccessful, display error message
        // TODO: If successful, redirect to home page

        // set to default
        showMessage("success", "Sign in successful");
        setEmail("");
        setPassword("");
        setChecked(false);
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
