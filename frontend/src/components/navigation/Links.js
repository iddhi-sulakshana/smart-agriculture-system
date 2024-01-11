import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

export default [
    {
        name: "Home",
        to: "/",
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
