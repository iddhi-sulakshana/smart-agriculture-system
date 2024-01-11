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

function PersonalCard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const { userDetails, loading, error } = useUserDetails();
    useEffect(() => {
        if (!loading && !error && userDetails) {
            setName(userDetails.name);
            setEmail(userDetails.email);
            setPhone(userDetails.phone);
            setAddress(userDetails.address);
            setAvatar(userDetails.avatar);
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
            <Stack direction="row" spacing={3}>
                <Stack
                    direction="row"
                    sx={{ display: "flex", my: 1 }}
                    spacing={3}
                >
                    <Avatar
                        sx={{
                            width: 75,
                            height: 75,
                        }}
                        size="lg"
                        src={avatar}
                        alt={name}
                    />
                </Stack>
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
                            <FormLabel>Name</FormLabel>
                            <Input
                                size="sm"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            <FormLabel>Phone No.</FormLabel>
                            <Input
                                size="sm"
                                placeholder="Phone No."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
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
