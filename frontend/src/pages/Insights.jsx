import { Box, Sheet, Table, Typography } from "@mui/joy";
import React from "react";

function Insights() {
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
            <Sheet
                sx={{
                    borderLeft: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography level="h2" textAlign="center">
                    Price Insights
                </Typography>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Yesterday Price</th>
                            <th>Today Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tomato</td>
                            <td>100</td>
                            <td>120</td>
                        </tr>
                        <tr>
                            <td>Onion</td>
                            <td>50</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Potato</td>
                            <td>30</td>
                            <td>40</td>
                        </tr>
                        <tr>
                            <td>Carrot</td>
                            <td>40</td>
                            <td>45</td>
                        </tr>
                        <tr>
                            <td>Beans</td>
                            <td>60</td>
                            <td>70</td>
                        </tr>
                    </tbody>
                </Table>
            </Sheet>
        </Box>
    );
}

export default Insights;
