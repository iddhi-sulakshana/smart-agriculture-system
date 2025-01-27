export default [
    {
        name: "Home",
        to: "/",
    },
    {
        name: "Market",
        to: "/market",
    },
    {
        name: "Sign In",
        to: "/signin",
        nonLogged: true,
    },
    {
        name: "Messages",
        to: "/messages",
        logged: true,
    },
    {
        name: "Profile",
        to: "/profile",
        logged: true,
    },
    {
        name: "Insights",
        to: "/insights",
        logged: false,
    },
    {
        name: "Crop Recommendation",
        to: "/recommendation",
        logged: true,
    },
    {
        name: "Information",
        to: "/information",
        logged: false,
    },
    {
        name: "Transportation",
        to: "/transportation",
        logged: false,
    },
];
