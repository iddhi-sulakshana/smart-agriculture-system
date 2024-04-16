import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

async function getInformation(category) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL(`informations/${category}`),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetInformation(category) {
    const [information, setInformation] = useState([]);

    useEffect(() => {
        getInformation(category)
            .then((information) => {
                setInformation(information);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching category details: " + error.message
                );
                setInformation([]);
            });
    }, []);
    return information;
}
