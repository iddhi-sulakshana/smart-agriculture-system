import React from "react";
import { Table, Tooltip } from "@mui/joy";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
const data = [
    {
        name: "Tomato",
        yesterdayPrice: 100,
        todayPrice: 90,
        predictedPrice: 70,
    },
    {
        name: "Onion",
        yesterdayPrice: 50,
        todayPrice: 60,
        predictedPrice: 50,
    },
    {
        name: "Potato",
        yesterdayPrice: 30,
        todayPrice: 40,
        predictedPrice: 50,
    },
    {
        name: "Carrot",
        yesterdayPrice: 40,
        todayPrice: 45,
        predictedPrice: 50,
    },
    {
        name: "Beans",
        yesterdayPrice: 60,
        todayPrice: 70,
        predictedPrice: 50,
    },
];

function PricesTable() {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>
                        Yesterday Price
                        <Tooltip title="Yesterday Price is the price of the product in the market yesterday.">
                            <HelpOutlineRoundedIcon />
                        </Tooltip>
                    </th>
                    <th>
                        Today Price
                        <Tooltip title="Today Price is the price of the product in the market today.">
                            <HelpOutlineRoundedIcon />
                        </Tooltip>
                    </th>
                    <th>
                        Predicted Price
                        <Tooltip title="Predicted Price is calculated based on the previous data and the current market trends.">
                            <HelpOutlineRoundedIcon />
                        </Tooltip>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.yesterdayPrice}</td>
                        <td
                            style={{
                                color:
                                    row.todayPrice > row.yesterdayPrice
                                        ? "green"
                                        : "red",
                            }}
                        >
                            {row.todayPrice}
                            {row.todayPrice > row.yesterdayPrice ? (
                                <ArrowDropUpRoundedIcon color="success" />
                            ) : (
                                <ArrowDropDownRoundedIcon color="danger" />
                            )}
                        </td>
                        <td
                            style={{
                                color:
                                    row.predictedPrice > row.todayPrice
                                        ? "green"
                                        : "red",
                            }}
                        >
                            {row.predictedPrice}
                            {row.predictedPrice > row.todayPrice ? (
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
