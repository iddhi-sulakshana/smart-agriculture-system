import React, { useEffect, useState } from "react";
// JOY UI Components
import {
    Avatar,
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
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
// hooks
import useUserDetails from "../../hooks/useUserDetails";
import { toast } from "react-toastify";
import CustomAvatar from "../CustomAvatar";

function PersonalCard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const [role, setRole] = useState("");
    const { userDetails, loading, error } = useUserDetails();
    useEffect(() => {
        if (!loading && !error && userDetails) {
            setName(userDetails.name);
            setEmail(userDetails.email);
            setPhone(userDetails.phone);
            setAddress(userDetails.address);
            setAvatar(userDetails.avatar);
            setRole(userDetails.role);
        }
    }, [userDetails, loading, error]);
    const handleUpdate = () => {
        // validate form data
        if (!name || !email || !phone || !address) {
            toast.error("Please fill all the fields");
            return;
        }
        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email) === false) {
            toast.error("Please enter a valid email");
            return;
        }
        // TODO: update user details
        // TODO: show snackbar
        // TODO: update user details
        toast.success("User details updated successfully");
    };
    return (
        <Card>
            <Box>
                <Typography level="title-md">Personal Info</Typography>
            </Box>
            <Divider />
            <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing={3}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alighItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alighItems: "center",
                        my: 1,
                        flexGrow: 1,
                    }}
                >
                    <CustomAvatar
                        src={avatar}
                        alt={name}
                        size="lg"
                        sx={{ width: 75, height: 75 }}
                        role={role}
                    />
                </Box>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={2}>
                        <FormControl
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 2,
                            }}
                        >
                            <FormLabel sx={{ flexGrow: 1 }}>Name</FormLabel>
                            <Input
                                size="sm"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            <FormLabel sx={{ flexGrow: 1 }}>
                                Phone_No.
                            </FormLabel>
                            <Input
                                size="sm"
                                placeholder="Phone No."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Address</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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

export default PersonalCard;
