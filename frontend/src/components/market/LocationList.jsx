import {
    Box,
    List,
    ListItem,
    ListItemButton,
    Option,
    Select,
    Typography,
} from "@mui/joy";
import React from "react";
import useGetLocation from "../../hooks/useGetLocation";

function LocationList({ location, setLocation }) {
    const locations = useGetLocation();
    return (
        <Box
            orientation="horizontal"
            sx={{
                px: 2,
                pb: 1,
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Location:
            </Typography>
            <Select
                sx={{ minWidth: "10rem" }}
                value={location}
                onChange={(e, next) => {
                    setLocation(next);
                }}
            >
                <Option value="">All</Option>
                {locations.map((location) => (
                    <Option key={location._id} value={location._id}>
                        {location.name}
                    </Option>
                ))}
            </Select>
        </Box>
    );
}

export default LocationList;
