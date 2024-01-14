import { List, ListItem, ListItemButton, Typography } from "@mui/joy";
import React from "react";

const locations = ["Anuradhapura", "Colombo", "Galle", "Kandy", "Jaffna"];

function LocationList() {
    const [selected, setSelected] = React.useState("");
    return (
        <List
            orientation="horizontal"
            sx={{
                px: 2,
                "--List-gap": "1rem",
                "--ListItem-radius": "0.3rem",
                overflowY: "auto",
                pb: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Location:
            </Typography>
            {locations.map((location, i) => (
                <ListItem key={i}>
                    <ListItemButton
                        variant="plain"
                        color="primary"
                        selected={selected === location}
                        onClick={() => setSelected(location)}
                    >
                        {location}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default LocationList;
