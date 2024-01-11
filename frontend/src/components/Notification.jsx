import { useColorScheme } from "@mui/joy";
import React from "react";
// toastifer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notification() {
    const { mode } = useColorScheme();
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnHover
            theme={mode === "dark" ? "dark" : "colored"}
            draggable
        />
    );
}

export default Notification;
