import React, { useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { token } = UserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/signin");
        }
    }, [token]);
    return <div>Profile</div>;
}

export default Profile;
