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

function SignUpForm({ switchToSignin }) {
    const [fade, setFade] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setFade(false);
    }, []);

    function handleSignUp(event) {
        event.preventDefault();

        // validate form
        if (!name || !email || !password) {
            alert("Please fill out all fields");
            return;
        }

        // TODO: Send request to backend to register the user
        // TODO: If successful, redirect to login page
        // TODO: If unsuccessful, display error message

        // set to default
        setName("");
        setEmail("");
        setPassword("");
        setChecked(false);
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
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const formElements = event.currentTarget.elements;
                            const data = {
                                email: formElements.email.value,
                                password: formElements.password.value,
                                persistent: formElements.persistent.checked,
                            };
                            alert(JSON.stringify(data, null, 2));
                        }}
                    >
                        <FormControl required>
                            <FormLabel>Name</FormLabel>
                            <Input type="text" name="name" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" />
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
                                />
                                <Link
                                    level="title-sm"
                                    href="#replace-with-a-link"
                                >
                                    Forgot your password?
                                </Link>
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
