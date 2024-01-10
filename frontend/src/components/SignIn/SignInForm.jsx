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
import React from "react";
import { Link } from "react-router-dom";

function SignInForm({ switchToSignup }) {
    return (
        <Box
            sx={{
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
                    // [`& .${formLabelClasses.asterisk}`]: {
                    //     visibility: "hidden",
                    // },
                }}
            >
                <Stack gap={1} mb={2}>
                    <Typography level="h3">Sign in</Typography>
                    <Typography level="body-sm">New here? </Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={switchToSignup}
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
