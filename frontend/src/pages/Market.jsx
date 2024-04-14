import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import TopBar from "../components/market/TopBar";
import Products from "../components/market/Products";
import CustomPagination from "../components/common/CustomPagination";
import axios from "axios";
import { getURL } from "../Utils/Url";

function Market() {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [crops, setCrops] = useState([]);
    useEffect(() => {
        setPage(1);
    }, [search, category, location]);
    useEffect(() => {
        axios
            .request({
                method: "get",
                url: getURL(
                    `crops/?page=${page}&page_size=${pageSize}${
                        search && `&search=${search}`
                    }${category && `&category=${category}`}${
                        location && `&location=${location}`
                    }`
                ),
            })
            .then((res) => {
                setTotal(res.data.pagination);
                setCrops(res.data.crops);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [page, search, category, location]);
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
            <TopBar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                location={location}
                setLocation={setLocation}
            />
            <Products crops={crops} />
            <CustomPagination
                total={total}
                pageSize={pageSize}
                setPage={setPage}
                page={page}
            />
        </Box>
    );
}

export default Market;
