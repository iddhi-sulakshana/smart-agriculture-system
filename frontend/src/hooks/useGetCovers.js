import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";

async function getCovers() {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("covers"),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetCovers() {
    const [covers, setCovers] = useState([]);

    useEffect(() => {
        getCovers()
            .then((covers) => {
                setCovers(covers);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching location details: " + error.message
                );
                setCovers([]);
            });
    }, []);
    return covers;
}
