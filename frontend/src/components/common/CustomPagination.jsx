import React from "react";
import { Pagination } from "antd";
import { Box } from "@mui/joy";

function CustomPagination() {
    const onChange = (page) => {
        console.log(page);
    };
    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination defaultCurrent={1} total={50} onChange={onChange} />
        </Box>
    );
}

export default CustomPagination;
