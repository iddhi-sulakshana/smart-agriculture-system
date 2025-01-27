import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

async function getCrop(id) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL(`crops/${id}`),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetCropDetails(id) {
    const [crop, setCrop] = useState(null);

    useEffect(() => {
        if (!id) return;
        getCrop(id)
            .then((crop) => {
                setCrop(crop);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching category details: " + error.message
                );
                setCrop(null);
            });
    }, [id]);
    return crop;
}
