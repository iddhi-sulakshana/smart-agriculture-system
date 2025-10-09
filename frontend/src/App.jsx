// React import not needed for this component
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
import About from "./pages/About";
import { SocketProvider } from "./contexts/SocketContext";
import { TourProvider } from "./contexts/TourContext";
import TourGuide from "./components/common/TourGuide";
import SimpleTourTest from "./components/common/SimpleTourTest";
import DriverTest from "./components/common/DriverTest";
import WorkingTourTest from "./components/common/WorkingTourTest";
import DriverImportTest from "./components/common/DriverImportTest";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpSupport from "./pages/HelpSupport";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <TourProvider>
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
                        <Route
                            path="/messages/"
                            element={
                                <SocketProvider>
                                    <Chat />
                                </SocketProvider>
                            }
                        />
                        <Route path="/insights" element={<Insights />} />
                        <Route
                            path="/transportation"
                            element={<Transportation />}
                        />
                        <Route
                            path="/recommendation"
                            element={<Recommendation />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/terms_conditions"
                            element={<TermsConditions />}
                        />
                        <Route
                            path="privacy_policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route path="/help_support" element={<HelpSupport />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route
                            path="/information/*"
                            element={<Information />}
                        />
                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />
                        <Route
                            path="/messages/:id"
                            element={
                                <SocketProvider>
                                    <Chat />
                                </SocketProvider>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout.Main>
                <Layout.Footer>
                    <Footer />
                </Layout.Footer>
            </Layout.Root>
            <Notification />
            <TourGuide />
            <SimpleTourTest />
            <DriverTest />
            <WorkingTourTest />
            <DriverImportTest />
            </TourProvider>
        </CssVarsProvider>
    );
}

export default App;
