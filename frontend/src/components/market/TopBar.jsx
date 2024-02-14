import { Box, Grid, Input } from "@mui/joy";
import React from "react";
import CategoryList from "./CategoryList";
import LocationList from "./LocationList";

function TopBar({
    search,
    setSearch,
    category,
    setCategory,
    location,
    setLocation,
}) {
    return (
        <Box>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                direction={{ xs: "row", md: "column" }}
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
                <Grid>
                    <CategoryList
                        category={category}
                        setCategory={setCategory}
                    />
                </Grid>
                <Grid>
                    <LocationList
                        location={location}
                        setLocation={setLocation}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default TopBar;
