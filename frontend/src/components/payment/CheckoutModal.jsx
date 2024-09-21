import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Skeleton,
    Typography,
} from "@mui/joy";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutModal = ({ open, setOpen, cropId, product }) => {
    const inputRef = (useRef < HTMLInputElement) | (null > null);

    const navigate = useNavigate();

    const [quantity, setQuantity] = React.useState(1);

    const checkout = () => {
        if (quantity <= 0) return;

        navigate("/checkout", {
            state: {
                product: {
                    ...product,
                },
                quantity,
                subtotal: (product?.price * quantity).toFixed(2),
            },
        });
    };
    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
        >
            <ModalDialog variant="outlined" layout="center">
                <DialogTitle>Checkout</DialogTitle>
                <ModalClose />
                <DialogContent>
                    <Typography level="h3" color="primary">
                        <Skeleton loading={!product} variant="text">
                            {product?.title}
                        </Skeleton>
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            my: 2,
                            gap: 2,
                        }}
                    >
                        <Typography
                            level="h5"
                            startDecorator="Rs."
                            endDecorator={`/${product?.unit}`}
                        >
                            <Skeleton loading={!product} variant="text">
                                {product?.price}
                            </Skeleton>
                        </Typography>
                        <Typography level="h5" startDecorator="X"></Typography>
                        <Input
                            error={quantity > product?.stock || quantity <= 0}
                            type="number"
                            placeholder={"max: " + product?.stock}
                            size="sm"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            endDecorator={product?.unit}
                            slotProps={{
                                input: {
                                    ref: inputRef,
                                    max: product?.stock,
                                    min: 1,
                                },
                            }}
                        />
                    </Box>
                    <Typography level="body-sm" color="danger">
                        {quantity > product?.stock
                            ? "Quantity exceeds stock available"
                            : quantity <= 0
                            ? "Quantity must be greater than 0"
                            : ""}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            my: 2,
                            gap: 2,
                        }}
                    >
                        <Typography
                            level="h5"
                            startDecorator="Total: "
                        ></Typography>
                        <Typography
                            level="h4"
                            startDecorator="Rs."
                            color="primary"
                        >
                            {(product?.price * quantity).toFixed(2)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            my: 2,
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={checkout}>
                            Checkout
                        </Button>
                    </Box>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
};

export default CheckoutModal;
