import React, { useState } from "react";
import { ConfigProvider, Pagination } from "antd";
import { Box, Typography } from "@mui/joy";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

function CustomPagination({ total, pageSize, setPage, page }) {
    const onChange = (page) => {
        setPage(page);
    };
    const itemRender = (current, type, originalElement) => {
        const commonBoxStyles = {
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };
        if (type === "prev") {
            return (
                <Box sx={commonBoxStyles}>
                    <NavigateBeforeRoundedIcon />
                </Box>
            );
        }
        if (type === "next") {
            return (
                <Box sx={commonBoxStyles}>
                    <NavigateNextRoundedIcon />
                </Box>
            );
        }
        if (type === "page") {
            return (
                <Box sx={commonBoxStyles}>
                    <Typography color="primary" level="body-md">
                        {current}
                    </Typography>
                </Box>
            );
        }
        return (
            <Typography color="primary" level="body-md">
                ...
            </Typography>
        );
    };
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemActiveBg: "transparent",
                        },
                    },
                }}
            >
                <Pagination
                    defaultCurrent={1}
                    itemRender={itemRender}
                    total={total}
                    defaultPageSize={pageSize}
                    showSizeChanger={false}
                    onChange={onChange}
                    current={page}
                    hideOnSinglePage={true}
                />
            </ConfigProvider>
        </Box>
    );
}

export default CustomPagination;
