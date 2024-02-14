import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";

async function getCategories() {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("categories"),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((categories) => {
                setCategories(categories);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching category details: " + error.message
                );
                setCategories([]);
            });
    }, []);
    return categories;
}
