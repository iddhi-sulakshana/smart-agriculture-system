import axios from "axios";
import { useEffect, useState } from "react";
import { getURL } from "../Utils/Url";
import UserContext from "../contexts/UserContext";

async function getCrops(token) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                url: getURL("crops/listed"),
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default function useGetFarmersCrops(refresh) {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = UserContext();
    useEffect(() => {
        setLoading(true);
        setError(null);
        setCrops([]);
        if (!token) {
            setLoading(false);
            setError(new Error("Token not found"));
            return;
        }

        getCrops(token)
            .then((listedCrops) => {
                setCrops(listedCrops);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [token, refresh]);
    return { crops, loading, error };
}
