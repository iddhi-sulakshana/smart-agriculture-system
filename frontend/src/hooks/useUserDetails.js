import { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { getURL } from "../Utils/Url";

async function getUserDetails(token) {
    // moch function to simulate API call with timeout and randomly throwing error
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("users/me"),
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useUserDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = UserContext();

    useEffect(() => {
        setLoading(true);
        setError(null);
        if (!token) {
            setError(true);
            setLoading(false);
            return;
        }
        getUserDetails(token)
            .then((userDetails) => {
                setUserDetails(userDetails);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Error fetching user details: " + error.message);
                setError(true);
                setLoading(false);
            });
    }, [token]);
    return { userDetails, loading, error };
}
