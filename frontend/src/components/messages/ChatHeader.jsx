import { Button, Chip, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import AvatarWithStatus from "./AvatarWithStatus";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { getURL } from "../../Utils/Url";
import UserContext from "../../contexts/UserContext";

function ChatHeader({ selectedChat, setSelectedChat, reciever }) {
    const [openDelete, setOpenDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { token } = UserContext();
    const handleDelete = () => {
        setConfirmLoading(true);

        axios.request({
            method: "DELETE",
            url: getURL("chat/" + selectedChat),
            headers: {
                "x-auth-token": token,
            },
        });

        setTimeout(() => {
            setOpenDelete(false);
            setConfirmLoading(false);
            toast.success("Conversation deleted successfully");
        }, 500);
    };
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.body",
            }}
            p={2}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                {/* Display User Picture */}
                <AvatarWithStatus
                    size="md"
                    src={reciever.avatar}
                    online={false}
                />
                <Typography
                    fontWeight="lg"
                    fontSize="lg"
                    component="h2"
                    noWrap
                    endDecorator={
                        <Chip
                            variant="outlined"
                            size="sm"
                            color="neutral"
                            sx={{
                                borderRadius: "sm",
                            }}
                            startDecorator={
                                <CircleIcon
                                    sx={{ fontSize: 8 }}
                                    color="success"
                                />
                            }
                        >
                            {reciever.role}
                        </Chip>
                    }
                >
                    {reciever.name}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
                <Popconfirm
                    title="Delete Conversation"
                    description="Delete this conversation?"
                    open={openDelete}
                    onConfirm={handleDelete}
                    okButtonProps={{ loading: confirmLoading }}
                    okText="Yes"
                    cancelText="No"
                    onCancel={() => {
                        setOpenDelete(false);
                    }}
                >
                    <Button
                        variant="plain"
                        color="danger"
                        size="sm"
                        onClick={() => {
                            setOpenDelete(true);
                        }}
                    >
                        <DeleteOutlineRoundedIcon />
                    </Button>
                </Popconfirm>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setSelectedChat(false);
                    }}
                >
                    <CloseRoundedIcon />
                </Button>
            </Stack>
        </Stack>
    );
}

export default ChatHeader;
