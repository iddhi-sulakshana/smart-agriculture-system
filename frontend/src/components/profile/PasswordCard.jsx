import React, { useState } from "react";
// JOY UI Components
import {
    Box,
    Button,
    Card,
    CardActions,
    CardOverflow,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
} from "@mui/joy";
import { toast } from "react-toastify";

function PasswordCard() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const handleUpdate = () => {
        // validate form data
        if (!currentPassword) {
            toast.error("Current password is required");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        // TODO: update password
        // TODO: clear form
        // TODO: show success message
        // TODO: show error message
        toast.success("Password updated successfully");
    };
    return (
        <Card>
            <Box>
                <Typography level="title-md">Change Password</Typography>
            </Box>
            <Divider />
            <Stack spacing={3} pt={3}>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <FormLabel>Current Password</FormLabel>
                    <Input
                        size="sm"
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <FormLabel>New Password</FormLabel>
                    <Input
                        size="sm"
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        size="sm"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
            </Stack>
            <CardOverflow
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="solid" onClick={handleUpdate}>
                        Update
                    </Button>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}

export default PasswordCard;
