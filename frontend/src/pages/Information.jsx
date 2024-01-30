import { Box, Divider, Grid, Sheet } from "@mui/joy";
import React, { useEffect } from "react";
import SectionList from "../components/information/SectionList";
import { Route, Routes, useNavigate } from "react-router-dom";
import News from "../components/information/News";
import Seeds from "../components/information/Seeds";
import Fertilizers from "../components/information/Fertilizers";
import Practices from "../components/information/Practices";
import Regulations from "../components/information/Regulations";
import Storage from "../components/information/Storage";

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
                    <Route path="/" element={<Practices />} />
                    <Route path="/seeds" element={<Seeds />} />
                    <Route path="/ferilizers" element={<Fertilizers />} />
                    <Route path="/practices" element={<Practices />} />
                    <Route path="/regulations" element={<Regulations />} />
                    <Route path="/storage" element={<Storage />} />
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
