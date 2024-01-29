import { Box } from "@mui/joy";
import React from "react";
import SearchBar from "../components/common/SearchBar";
import SectionList from "../components/information/SectionList";

function Information() {
    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <SectionList />
            <SearchBar />
        </Box>
    );
}

export default Information;
