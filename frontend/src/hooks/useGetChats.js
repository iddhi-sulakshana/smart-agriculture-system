import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";

async function getChats(token) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("chat"),
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

export default function useGetChats() {
    const [chats, setChats] = useState([]);
    const { token } = UserContext();

    useEffect(() => {
        if (!token) {
            setChats([]);
            return;
        }
        getChats(token)
            .then((chats) => {
                setChats(chats);
            })
            .catch((error) => {
                toast.error("Error fetching Chat details: " + error.message);
                setChats([]);
            });
    }, [token]);
    return chats;
}
