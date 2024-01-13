import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

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
        name: "Profile",
        to: "/profile",
        logged: true,
    },
];
