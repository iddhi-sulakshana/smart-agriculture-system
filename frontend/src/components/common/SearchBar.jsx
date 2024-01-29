import { Input, Grid } from "@mui/joy";
import React, { useState } from "react";

function SearchBar() {
    const [search, setSearch] = useState("");
    return (
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
        </Grid>
    );
}

export default SearchBar;
