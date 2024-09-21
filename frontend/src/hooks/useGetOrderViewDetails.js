import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

async function getOrder(id) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL(`payment/order/${id}`),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetOrderViewDetails(id) {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (!id) return;
        getOrder(id)
            .then((order) => {
                setOrder(order);
            })
            .catch((error) => {
                toast.error("Error fetching order details: " + error.message);
                setOrder(null);
            });
    }, [id]);
    return order;
}
