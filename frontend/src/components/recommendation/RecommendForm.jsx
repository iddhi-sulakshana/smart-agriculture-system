import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select,
} from "@mui/joy";
import React, { useState } from "react";
import useLocations from "../../hooks/useLocations";

function RecommendForm({ setOpen }) {
    const [location, setLocation] = useState("");
    const locationData = useLocations();
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
                    <FormLabel>Location</FormLabel>
                    <Select
                        placeholder="Select Location"
                        defaultValue=""
                        value={location}
                        onChange={(e, next) => {
                            setLocation(next);
                        }}
                    >
                        {locationData.map((location) => (
                            <Option key={location} value={location}>
                                {location}
                            </Option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Soil Type</FormLabel>
                    <Select placeholder="Select Soil Type">
                        <Option value="loamy">Loamy</Option>
                        <Option value="sandy">Sandy</Option>
                        <Option value="clay">Clay</Option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Rainfall</FormLabel>
                    <Input
                        type="number"
                        placeholder="Rainfall"
                        endDecorator="mm"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Season</FormLabel>
                    <Select placeholder="Select Season">
                        <Option value="summer">Summer</Option>
                        <Option value="winter">Winter</Option>
                        <Option value="monsoon">Monsoon</Option>
                    </Select>
                </FormControl>
                {/* centered submit button */}
                <FormControl sx={{ gridColumn: "1 / -1" }}>
                    <Button
                        color="primary"
                        fullWidth
                        sx={{ mx: "auto" }}
                        onClick={() => setOpen(true)}
                    >
                        Get Recommendation
                    </Button>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default RecommendForm;
