import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
// Joy components
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
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
                <Layout.Main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout.Main>
            </Layout.Root>
        </CssVarsProvider>
    );
}

export default App;
