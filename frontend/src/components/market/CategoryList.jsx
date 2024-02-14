import { List, ListItem, ListItemButton, Typography } from "@mui/joy";
import React from "react";
import useGetCategory from "../../hooks/useGetCategory";

function CategoryList({ category, setCategory }) {
    const categories = useGetCategory();
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
            {categories.map((category) => (
                <ListItem key={category._id}>
                    <ListItemButton
                        selected={category === category._id}
                        onClick={() => setCategory(category._id)}
                        variant="plain"
                        color="primary"
                    >
                        {category.name}
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default CategoryList;
