import { useState } from "react";

async function getLocations() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                "Anuradhapura",
                "Colombo",
                "Galle",
                "Jaffna",
                "Kandy",
                "Matara",
                "Nuwara Eliya",
                "Polonnaruwa",
                "Trincomalee",
                "Vavuniya",
            ]);
        }, 1000);
    });
}

export default function useLocations() {
    const [locations, setLocations] = useState([]);

    getLocations()
        .then((locations) => {
            setLocations(locations);
        })
        .catch((error) => {
            console.error("Error fetching locations", error);
            setLocations([]);
        });

    return locations;
}
