import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemDecorator,
    Typography,
} from "@mui/joy";
import React from "react";
import { FastfoodOutlined } from "@mui/icons-material";

const categories = ["Vegetables", "Fruits", "Meat", "Fish", "Beverages"];

function CategoryList() {
    const [selected, setSelected] = React.useState("");
    return (
        <List
            orientation="horizontal"
            sx={{
                px: 2,
                "--List-gap": "1rem",
                "--ListItem-radius": "0.3rem",
                pb: 1,
                display: "flex",
                overflowY: "auto",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Category:
            </Typography>
            {categories.map((category, i) => (
                <ListItem key={i}>
                    <ListItemButton
                        selected={selected === category}
                        onClick={() => setSelected(category)}
                        variant="plain"
                        color="primary"
                    >
                        <ListItemDecorator>
                            <FastfoodOutlined />
                        </ListItemDecorator>
                        {category}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default CategoryList;
