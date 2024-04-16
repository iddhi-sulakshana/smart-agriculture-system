import { useEffect, useState } from "react";
import axios from "axios";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

async function getLocations() {
    return new Promise((resolve, reject) => {
        axios
            .request({
                method: "get",
                url: getURL("locations"),
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default function useGetLocation() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        getLocations()
            .then((locations) => {
                setLocations(locations);
            })
            .catch((error) => {
                toast.error(
                    "Error fetching location details: " + error.message
                );
                setLocations([]);
            });
    }, []);
    return locations;
}
