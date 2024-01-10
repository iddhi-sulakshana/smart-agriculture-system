import React from "react";
import { Route, Routes } from "react-router-dom";
// Joy components
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
// Local components
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Header from "./components/navigation/Header";
import Footer from "./components/navigation/Footer";
import SignIn from "./pages/SignIn";
import SnackBarContext from "./contexts/SnackBarContext";
import { IconButton, Snackbar } from "@mui/joy";

function App() {
    const { open, message, setOpen } = SnackBarContext();
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
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout.Main>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout.Root>
            {/* Snackbar */}
            <Snackbar
                color={message.color}
                variant="solid"
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                {message.message}
            </Snackbar>
        </CssVarsProvider>
    );
}

export default App;
