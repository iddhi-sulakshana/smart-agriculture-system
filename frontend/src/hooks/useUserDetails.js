import { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
const user = {
    name: "John Doe",
    email: "jhon@doe.com",
    phone: "0123456789",
    address: "123 Main St",
    avatar:
        "https://i.pravatar.cc/40?img=" + Math.floor(Math.random() * 70 + 1),
    role: "farmer",
};
async function getUserDetails() {
    // moch function to simulate API call with timeout and randomly throwing error
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(user);
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
            return;
        }
        getUserDetails()
            .then((userDetails) => {
                setUserDetails(userDetails);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Error fetching user details: " + error.message);
                setError(error.message);
                setLoading(false);
            });
        // TODO: Fetch user details from API
        // TODO: Handle loading and error states
        // TODO: Set user details state
    }, [token]);
    return { userDetails, loading, error };
}
