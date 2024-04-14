import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// JOY UI Components
import { Grid, Stack } from "@mui/joy";
// contexts
import UserContext from "../contexts/UserContext";
import PersonalCard from "../components/profile/PersonalCard";
import PasswordCard from "../components/profile/PasswordCard";
import CropListingCard from "../components/profile/CropListingCard";
function Profile() {
    const { token } = UserContext();
    const navigate = useNavigate();
    const [role, setRole] = useState("");
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
                    <PersonalCard role={role} setRole={setRole} />
                </Grid>
                <Grid xs={12} md={6}>
                    <PasswordCard />
                </Grid>
                {role === "farmer" && (
                    <Grid xs={12}>
                        <CropListingCard />
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
}

export default Profile;
