import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// Joy components
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Button, Stack } from "@mui/joy";
// MUI icons
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
// Local components
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Header from "./components/Header";

function App() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Layout.Root>
                <Layout.Header>
                    <Header />
                </Layout.Header>
            </Layout.Root>
        </CssVarsProvider>
        // <>
        //     {/* Navbar */}
        //     {/* Routes */}
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="*" element={<NotFound />} />
        //     </Routes>
        //     {/* Footer */}
        // </>
    );
}

export default App;
