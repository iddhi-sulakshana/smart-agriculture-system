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
import Profile from "./pages/Profile";
import Notification from "./components/Notification";
import Market from "./pages/Market";
import ProductDetails from "./pages/ProductDetails";
import Chat from "./pages/Chat";
import Information from "./pages/Information";
import Transportation from "./pages/Transportation";
import Insights from "./pages/Insights";
import Recommendation from "./pages/Recommendation";

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
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/market" element={<Market />} />
                        <Route path="/messages/" element={<Chat />} />
                        <Route path="/messages/:id" element={<Chat />} />
                        <Route path="/insights" element={<Insights />} />
                        <Route
                            path="/transportation"
                            element={<Transportation />}
                        />
                        <Route
                            path="/recommendation"
                            element={<Recommendation />}
                        />
                        <Route
                            path="/information/*"
                            element={<Information />}
                        />
                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout.Main>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout.Root>
            <Notification />
        </CssVarsProvider>
    );
}

export default App;
