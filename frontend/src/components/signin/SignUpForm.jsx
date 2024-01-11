import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Radio,
    Stack,
    Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpForm({ switchToSignin }) {
    const [fade, setFade] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        setFade(false);
    }, []);

    function handleSignUp(event) {
        event.preventDefault();
        // validate form
        if (!name || !email || !password || !role) {
            toast.error("Please fill out all fields");
            return;
        }
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
            toast.error("Please enter a valid email");
            return;
        }

        // TODO: Send request to backend to register the user
        // TODO: If successful, redirect to login page
        // TODO: If unsuccessful, display error message

        // set to default
        toast.success("Successfully registered");
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setFade(true);
        switchToSignin();
    }

    return (
        <Box
            sx={{
                transition: "opacity 0.3s, transform 0.4s",
                transform: fade ? "translateX(25%)" : "translateX(0)",
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
                    <Typography level="h3">Sign Up</Typography>
                    <Typography level="body-sm">Already registered?</Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            setFade(true);
                            switchToSignin();
                        }}
                    >
                        Sign In
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
                    <form onSubmit={handleSignUp} noValidate>
                        <FormControl required>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    px: 2,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Radio
                                    size="sm"
                                    label="I'm a Farmer"
                                    name="persistent"
                                    checked={role === "farmer"}
                                    onChange={(e) => setRole("farmer")}
                                />
                                <Radio
                                    size="sm"
                                    label="I'm a Wholeseller"
                                    name="persistent"
                                    checked={role === "wholeseller"}
                                    onChange={(e) => setRole("wholeseller")}
                                />
                            </Box>
                            <Button type="submit" fullWidth>
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </Box>
    );
}

export default SignUpForm;