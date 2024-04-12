import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";

async function getReciever(token, id) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL(`chat/${id}/reciever`),
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

export default function useGetReciever(id) {
    const [reciever, setReciever] = useState([]);
    const { token } = UserContext();

    useEffect(() => {
        if (!token || !id) {
            setReciever([]);
            return;
        }
        getReciever(token, id)
            .then((reciever) => {
                setReciever(reciever);
            })
            .catch((error) => {
                toast.error("Error fetching reciever: " + error.message);
                setReciever([]);
            });
    }, [token, id]);
    return reciever;
}
