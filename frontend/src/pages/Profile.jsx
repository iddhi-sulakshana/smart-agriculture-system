import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// JOY UI Components
import { Grid, Stack } from "@mui/joy";
// contexts
import UserContext from "../contexts/UserContext";
import PersonalCard from "../components/profile/PersonalCard";
import PasswordCard from "../components/profile/PasswordCard";
function Profile() {
    const { token } = UserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, [token]);
    return (
        <Stack
            spacing={4}
            sx={{
                display: "flex",
                mx: "auto",
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Grid container spacing={4}>
                <Grid xs={12} md={6}>
                    <PersonalCard />
                </Grid>
                <Grid xs={12} md={6}>
                    <PasswordCard />
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Profile;
