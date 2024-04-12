import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select,
    Tooltip,
} from "@mui/joy";
import React, { useState } from "react";

function RecommendForm({
    setOpen,
    Nval,
    setNval,
    Pval,
    setPval,
    Kval,
    setKval,
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    ph,
    setPh,
    rainfall,
    setRainfall,
}) {
    return (
        <Card
            variant="outlined"
            sx={{
                mx: "auto",
            }}
        >
            <CardContent
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                }}
            >
                <FormControl>
                    <FormLabel>
                        Nitrogen
                        <Tooltip
                            color="primary"
                            title="Ratio of Nitrogen content in soil."
                        >
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="Nitrogen"
                        endDecorator="kg/ha"
                        value={Nval}
                        onChange={(e) => {
                            setNval(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Phosphorus
                        <Tooltip
                            color="primary"
                            title="Ratio of Phosphorus content in soil."
                        >
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="Phosphorus"
                        endDecorator="kg/ha"
                        value={Pval}
                        onChange={(e) => {
                            setPval(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Potassium
                        <Tooltip
                            color="primary"
                            title="Ratio of Potassium content in soil."
                        >
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="Potassium"
                        endDecorator="kg/ha"
                        value={Kval}
                        onChange={(e) => {
                            setKval(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Temperature
                        <Tooltip
                            color="primary"
                            title="temperature in degree Celsius"
                        >
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="Temperature"
                        endDecorator="°C"
                        value={temperature}
                        onChange={(e) => {
                            setTemperature(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Humidity
                        <Tooltip color="primary" title="relative humidity in %">
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="Humidity"
                        endDecorator="%"
                        value={humidity}
                        onChange={(e) => {
                            setHumidity(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        pH
                        <Tooltip color="primary" title="pH value of the soil">
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="pH"
                        value={ph}
                        onChange={(e) => {
                            setPh(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>
                        Rainfall
                        <Tooltip color="primary" title="Rainfall in mm">
                            <Button variant="text">?</Button>
                        </Tooltip>
                    </FormLabel>
                    <Input
                        type="number"
                        placeholder="Rainfall"
                        endDecorator="mm"
                        value={rainfall}
                        onChange={(e) => {
                            setRainfall(e.target.value);
                        }}
                    />
                </FormControl>

                {/* centered submit button */}
                <FormControl sx={{ gridColumn: "1 / -1" }}>
                    <Button
                        color="primary"
                        fullWidth
                        sx={{ mx: "auto" }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Get Recommendation
                    </Button>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default RecommendForm;
