import { Box, Divider, Grid, Sheet } from "@mui/joy";
import React, { useEffect } from "react";
import SectionList from "../components/information/SectionList";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../components/information/Main";
import News from "../components/information/News";
import Seeds from "../components/information/Seeds";
import Fertilizers from "../components/information/Fertilizers";

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
            <Divider />
            <Sheet
                sx={{
                    flex: 1,
                    width: "100%",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "3fr 1fr",
                    },
                    boxShadow: 1,
                    p: 2,
                    mt: 1,
                }}
            >
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/seeds" element={<Seeds />} />
                    <Route path="/ferilizers" element={<Fertilizers />} />
                    <Route path="/prices" element={<h1>Prices</h1>} />
                    <Route path="/regulations" element={<h1>Regulations</h1>} />
                    <Route path="/storage" element={<h1>Storage</h1>} />
                    <Route path="/*" element={<Redirect />} />
                </Routes>
                <News />
            </Sheet>
        </Box>
    );
}
const Redirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/404");
    }, []);
    return <></>;
};

export default Information;
