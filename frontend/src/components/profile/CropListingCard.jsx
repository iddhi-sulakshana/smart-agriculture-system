import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/joy";
import React, { useState } from "react";
import CropClickableCard from "./CropClickableCard";
import NewCropModal from "./NewCropModal";
import AddIcon from "@mui/icons-material/Add";
import useGetFarmersCrops from "../../hooks/useGetFarmersCrops";

function CropListingCard() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const { crops, loading, error } = useGetFarmersCrops(refresh);
    const handleAdd = (select) => {
        setSelected(null);
        setOpen(true);
    };
    const handleEdit = (select) => {
        setSelected(select);
        setOpen(true);
    };
    return (
        <Card>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography level="title-md">Listed Crops</Typography>
                <Button
                    endDecorator={<AddIcon />}
                    size="sm"
                    variant="solid"
                    onClick={() => handleAdd()}
                >
                    Add New Item
                </Button>
            </Box>
            <Divider />
            <CardContent>
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    {loading && <Typography>Loading...</Typography>}
                    {error && <Typography>{error.message}</Typography>}
                    {!loading && !error && crops.length === 0 && (
                        <Typography>No crops listed yet</Typography>
                    )}
                    {!loading &&
                        !error &&
                        crops.length > 0 &&
                        crops.map((crop, index) => (
                            <Grid xs={12} sm={6} md={3} key={index}>
                                <CropClickableCard
                                    loading={loading}
                                    _id={crop._id}
                                    title={crop.title}
                                    price={crop.price}
                                    image={crop.image}
                                    stock={crop.stock}
                                    unit={crop.unit}
                                    location={crop.location}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                    handleEdit={handleEdit}
                                />
                            </Grid>
                        ))}
                </Grid>
            </CardContent>
            <NewCropModal
                open={open}
                setOpen={setOpen}
                selected={selected}
                setSelected={setSelected}
                refresh={refresh}
                setRefresh={setRefresh}
            />
        </Card>
    );
}

export default CropListingCard;
