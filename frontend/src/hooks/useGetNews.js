import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

async function getNews() {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("news"),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetNews() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews()
            .then((news) => {
                setNews(news);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching category details: " + error.message
                );
                setNews([]);
            });
    }, []);
    return news;
}
