import { Box, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import RecommendForm from "../components/recommendation/RecommendForm";
import ResultModal from "../components/recommendation/ResultModal";
import axios from "axios";
import { getURL } from "../Utils/Url";

function Recommendation() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [Nval, setNval] = useState(0);
    const [Pval, setPval] = useState(0);
    const [Kval, setKval] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [ph, setPh] = useState(0);
    const [rainfall, setRainfall] = useState(0);

    const [prediction, setPrediction] = useState("");
    const [error, setError] = useState("");

    const predictCrop = async () => {
        return new Promise((resolve, reject) => {
            axios
                .request({
                    method: "POST",
                    url: getURL("predict"),
                    data: {
                        N: Nval,
                        P: Pval,
                        K: Kval,
                        temperature: temperature,
                        humidity: humidity,
                        ph: ph,
                        rainfall: rainfall,
                    },
                })
                .then((response) => {
                    setPrediction(response.data.prediction);
                    resolve();
                })
                .catch((error) => {
                    if (!error.response) setError("Internal server error");
                    else setError(error.response.data);
                    reject();
                });
        });
    };

    useEffect(() => {
        if (open) {
            setPrediction("");
            setError("");
            predictCrop()
                .then(() => {
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(true);
        }
    }, [open]);

    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Typography level="h2" textAlign="center" mb={2}>
                Crop Recommendation
            </Typography>
            <RecommendForm
                setOpen={setOpen}
                Nval={Nval}
                setNval={setNval}
                Pval={Pval}
                setPval={setPval}
                Kval={Kval}
                setKval={setKval}
                temperature={temperature}
                setTemperature={setTemperature}
                humidity={humidity}
                setHumidity={setHumidity}
                ph={ph}
                setPh={setPh}
                rainfall={rainfall}
                setRainfall={setRainfall}
            />
            <ResultModal
                error={error}
                open={open}
                setOpen={setOpen}
                loading={loading}
                prediction={prediction}
            />
        </Box>
    );
}

export default Recommendation;
