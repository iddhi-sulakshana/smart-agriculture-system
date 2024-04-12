import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";

async function getMessages(token, id) {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL(`chat/${id}/messages`),
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

export default function useGetMessages(id) {
    const [messages, setMessages] = useState([]);
    const { token } = UserContext();

    useEffect(() => {
        if (!token || !id) {
            setMessages([]);
            return;
        }
        getMessages(token, id)
            .then((messages) => {
                setMessages(messages);
            })
            .catch((error) => {
                toast.error("Error fetching Messages: " + error.message);
                setMessages([]);
            });
    }, [token, id]);
    return { messages, setMessages };
}
