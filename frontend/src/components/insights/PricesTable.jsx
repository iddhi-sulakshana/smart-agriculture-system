import React from "react";
import { Table, Tooltip } from "@mui/joy";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import useGetCategory from "../../hooks/useGetCategory";
const data = [
    {
        name: "Tomato",
        yesterdayPrice: 100,
        todayPrice: 90,
    },
    {
        name: "Onion",
        yesterdayPrice: 50,
        todayPrice: 60,
    },
    {
        name: "Potato",
        yesterdayPrice: 30,
        todayPrice: 40,
    },
    {
        name: "Carrot",
        yesterdayPrice: 40,
        todayPrice: 45,
    },
    {
        name: "Beans",
        yesterdayPrice: 60,
        todayPrice: 70,
    },
];

function PricesTable() {
    const categories = useGetCategory();
    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>
                        This Week Price
                        <Tooltip title="This week prices were gathered from the Department of Statistics.">
                            <HelpOutlineRoundedIcon />
                        </Tooltip>
                    </th>
                    <th>
                        Next Week Predicted Price
                        <Tooltip title="Predicted Price is calculated based on the previous data gathered from the Department of Statistics and may vary.">
                            <HelpOutlineRoundedIcon />
                        </Tooltip>
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories.map((row) => (
                    <tr key={row._id}>
                        <td>{row.name}</td>
                        <td>{row.weekPrice}</td>
                        <td
                            style={{
                                color:
                                    row.predictedPrice > row.weekPrice
                                        ? "green"
                                        : "red",
                            }}
                        >
                            {row.predictedPrice}
                            {row.predictedPrice > row.weekPrice ? (
                                <ArrowDropUpRoundedIcon color="success" />
                            ) : (
                                <ArrowDropDownRoundedIcon color="danger" />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default PricesTable;
