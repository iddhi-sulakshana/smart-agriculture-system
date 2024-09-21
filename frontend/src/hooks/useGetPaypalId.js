import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

async function getPaypalId() {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("payment/paypal"),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetPaypalId() {
    const [paypalId, setPaypalId] = useState("");

    useEffect(() => {
        getPaypalId()
            .then((id) => {
                setPaypalId(id);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching category details: " + error.message
                );
                setPaypalId("");
            });
    }, []);
    return paypalId;
}
