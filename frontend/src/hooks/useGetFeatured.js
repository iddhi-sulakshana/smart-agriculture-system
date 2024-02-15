import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";

async function getFeatured() {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("crops/featured"),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetFeatured() {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        getFeatured()
            .then((featured) => {
                setFeatured(featured);
            })
            .catch((error) => {
                toast.error("Error fetching featured crops: " + error.message);
                setFeatured([]);
            });
    }, []);
    return featured;
}
