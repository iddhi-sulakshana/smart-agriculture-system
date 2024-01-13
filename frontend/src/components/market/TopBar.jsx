import {
    Box,
    Grid,
    Input,
    List,
    ListItem,
    ListItemButton,
    ListItemDecorator,
} from "@mui/joy";
import { FastfoodOutlined } from "@mui/icons-material";
import React, { useState } from "react";

function TopBar() {
    const [search, setSearch] = useState("");
    return (
        <Box>
            <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ flexGrow: 1 }}
            >
                <Grid xs={12}>
                    <Input
                        fullWidth
                        value={search}
                        placeholder="Search..."
                        startDecorator={<span data-feather="search" />}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>
                <List
                    orientation="horizontal"
                    sx={{
                        px: 2,
                        "--List-gap": "1rem",
                        "--ListItem-radius": "0.3rem",
                        overflowY: "auto",
                        pb: 1,
                    }}
                >
                    <ListItem>
                        <ListItemButton
                            variant="plain"
                            color="primary"
                            selected
                        >
                            <ListItemDecorator>
                                <FastfoodOutlined />
                            </ListItemDecorator>
                            Vegetables
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton variant="plain" color="primary">
                            <ListItemDecorator>
                                <FastfoodOutlined />
                            </ListItemDecorator>
                            Vegetables
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton variant="plain" color="primary">
                            <ListItemDecorator>
                                <FastfoodOutlined />
                            </ListItemDecorator>
                            Vegetables
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Box>
    );
}

export default TopBar;
