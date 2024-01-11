import { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

async function getUserDetails() {
    // moch function to simulate API call with timeout and randomly throwing error
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve({
                    name: "John Doe",
                    email: "jhon@doe.com",
                    // random number between 1 to 70 to end of the url
                    avatar:
                        "https://i.pravatar.cc/40?img=" +
                        Math.floor(Math.random() * 70 + 1),
                });
            } else {
                reject(new Error("Something went wrong"));
            }
        }, 1000);
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
            setError("No token provided");
            setLoading(false);
        }
        getUserDetails()
            .then((userDetails) => {
                console.log(userDetails);
                setUserDetails(userDetails);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
                setLoading(false);
            });
        // TODO: Fetch user details from API
        // TODO: Handle loading and error states
        // TODO: Set user details state
    }, [token]);
    return { userDetails, loading, error };
}
