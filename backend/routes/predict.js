import { Router } from "express";
import Joi from "joi-oid";
import axios from "axios";

const router = Router();

// get the prediction
router.post("/", async (req, res) => {
    const schema = new Joi.object({
        N: Joi.number().required(),
        P: Joi.number().required(),
        K: Joi.number().required(),
        temperature: Joi.number().required(),
        humidity: Joi.number().required(),
        ph: Joi.number().required(),
        rainfall: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // convert the request body values to integers
    req.body.N = parseInt(req.body.N);
    req.body.P = parseInt(req.body.P);
    req.body.K = parseInt(req.body.K);
    req.body.temperature = parseInt(req.body.temperature);
    req.body.humidity = parseInt(req.body.humidity);
    req.body.ph = parseInt(req.body.ph);
    req.body.rainfall = parseInt(req.body.rainfall);

    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    // send prediction request to python server
    // and get the response
    axios
        .post(
            (process.env.RECOMMENDATION_URL || "http://localhost:2000") +
                "/predict",
            {
                N,
                P,
                K,
                temperature,
                humidity,
                ph,
                rainfall,
            }
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            console.log(error);
            if (!error.response)
                return res.status(500).send("Internal server error");
            return res.status(error.response.status).send(error.response.data);
        });
});

export default router;
