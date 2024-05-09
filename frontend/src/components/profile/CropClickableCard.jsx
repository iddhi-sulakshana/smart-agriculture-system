import {
    AspectRatio,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardOverflow,
    Grid,
    Skeleton,
    Typography,
} from "@mui/joy";
import React, { useState } from "react";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { getRootURL, getURL } from "../../Utils/Url";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CropClickableCard({
    loading = true,
    _id,
    title,
    price,
    image,
    stock,
    unit = "kg",
    location,
    refresh,
    setRefresh,
    handleEdit,
}) {
    const { token } = UserContext();
    const [updateLoading, setUpdateLoading] = useState(false);
    const navigate = useNavigate();
    const onClick = () => {
        if (!_id) return;
        navigate(`/product/${_id}`);
    };
    const deleteCrop = () => {
        setUpdateLoading(true);

        axios
            .request({
                method: "DELETE",
                url: getURL(`crops/${_id}`),
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((response) => {
                toast.success(response.data);
                setRefresh(!refresh);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
            .finally(() => {
                setUpdateLoading(false);
            });
    };
    const soldCrop = () => {
        setUpdateLoading(true);

        axios
            .request({
                method: "PATCH",
                url: getURL(`crops/sold/${_id}`),
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((response) => {
                toast.success(response.data);
                setRefresh(!refresh);
            })
            .catch((error) => {
                toast.error(error.response.data);
            })
            .finally(() => {
                setUpdateLoading(false);
            });
    };
    return (
        <Grid
            onClick={onClick}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <Card
                orientation="vertical"
                variant="outlined"
                sx={(theme) => ({
                    transition: "0.4s",
                    minWidth: "14rem",
                    "&:hover": {
                        boxShadow: theme.shadow.xl,
                        transform: "scale(1.04)",
                    },
                })}
            >
                <CardOverflow>
                    <AspectRatio ratio={2 / 1}>
                        {loading ? (
                            <Skeleton>
                                <img src="" alt="loading" />
                            </Skeleton>
                        ) : (
                            <img
                                src={getRootURL(`crops/${image}`)}
                                loading="lazy"
                                alt={title}
                            />
                        )}
                    </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ textAlign: "center" }}>
                    {loading ? (
                        <Typography level="body-md" textAlign="center">
                            <Skeleton>Loading</Skeleton>
                        </Typography>
                    ) : (
                        <Typography
                            textAlign="center"
                            level="body-md"
                            fontWeight="lg"
                            textColor="primary.plainColor"
                        >
                            {title}
                        </Typography>
                    )}
                    {loading ? (
                        <Typography textAlign="center" level="body-md">
                            <Skeleton>Loading</Skeleton>
                        </Typography>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                textAlign="center"
                                level="body-md"
                                startDecorator="Rs."
                                endDecorator={`/${unit}`}
                            >
                                {Number(price).toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                    {loading ? (
                        <Typography textAlign="center" level="body-md">
                            <Skeleton>Loading</Skeleton>
                        </Typography>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                textAlign="center"
                                level="body-md"
                                endDecorator={`${unit}`}
                            >
                                {Number(stock).toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                </CardContent>
                <CardOverflow>
                    {loading ? (
                        <Skeleton>Loading</Skeleton>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                            mb={1}
                        >
                            <Typography
                                textAlign="center"
                                level="body-sm"
                                startDecorator={<PlaceRoundedIcon />}
                            >
                                {location}
                            </Typography>
                        </Box>
                    )}
                </CardOverflow>
                <CardActions
                    sx={{
                        display: "flex",
                        flexDirection: {
                            md: "row",
                            xs: "column",
                        },
                    }}
                >
                    <Button
                        fullWidth
                        variant="solid"
                        color="danger"
                        onClick={deleteCrop}
                        loading={updateLoading}
                    >
                        Delete
                    </Button>
                    <Button
                        fullWidth
                        variant="solid"
                        color="warning"
                        onClick={soldCrop}
                        loading={updateLoading}
                    >
                        Mark as Sold
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="neutral"
                        onClick={() => handleEdit(_id)}
                        loading={updateLoading}
                    >
                        Edit
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CropClickableCard;
