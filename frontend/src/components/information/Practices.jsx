import {
    AspectRatio,
    Box,
    Card,
    CardContent,
    CardOverflow,
    DialogContent,
    DialogTitle,
    Grid,
    Modal,
    ModalClose,
    ModalDialog,
    Typography,
} from "@mui/joy";
import Markdown from "react-markdown";
import React, { useState } from "react";

const data = [
    {
        id: 1,
        title: "Crop Rotation",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/new1-600x331.jpg",
        description:
            "Rotate crops regularly to prevent soil depletion, control pests and diseases, and maintain soil fertility.",
        longDescription: `
## Crop Rotation:
Crop rotation is a fundamental agricultural practice that involves growing different crops in a planned sequence on the same piece of land over time. This technique helps to maintain soil health and fertility, control pests and diseases, and optimize crop yields. By rotating crops, farmers can effectively manage nutrient cycles, break pest life cycles, and reduce soil erosion.

### Benefits of Crop Rotation:
- **Soil Health:** Crop rotation improves soil structure, enhances soil organic matter content, and increases microbial diversity, promoting long-term soil fertility and resilience.
- **Pest and Disease Management:** Rotating crops disrupts pest and disease cycles by reducing the buildup of specific pathogens and pests that target particular crop species.
- **Nutrient Management:** Different crops have varying nutrient requirements, and crop rotation helps to balance soil nutrient levels and reduce the need for synthetic fertilizers.
- **Weed Control:** Crop rotation can suppress weed growth by disrupting weed seed banks and employing allelopathic effects from certain crops.
`,
    },
    {
        id: 2,
        title: "Soil Health Management",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/Big-Onion-150x150.jpg",
        description:
            "Emphasize the importance of soil testing to assess nutrient levels, pH balance, and organic matter content.",
        longDescription: `
## Soil Health Management:
Soil health management is essential for sustainable agriculture, as healthy soils are the foundation of productive and resilient cropping systems. Healthy soil supports robust plant growth, efficient nutrient cycling, and enhanced water retention, leading to improved crop yields and environmental sustainability.

### Key Principles of Soil Health Management:
- **Soil Testing:** Regular soil testing is crucial for assessing soil fertility, pH levels, and nutrient deficiencies. Soil tests provide valuable information that enables farmers to make informed decisions about fertilization and soil amendment strategies.
- **Organic Matter Management:** Increasing soil organic matter content through practices such as composting, cover cropping, and crop residue management improves soil structure, moisture retention, and nutrient availability.
- **Reduced Tillage:** Minimizing soil disturbance through reduced tillage or no-till practices helps to preserve soil structure, reduce erosion, and enhance soil carbon sequestration.
- **Crop Diversity:** Diversifying crop rotations and integrating cover crops into cropping systems enhances biodiversity, promotes beneficial soil organisms, and reduces soil erosion and compaction.
`,
    },
    {
        id: 3,
        title: "Water Conservation",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/IMG_20191001_125430-1024x646.jpg",
        description:
            "Encourage efficient irrigation practices such as drip irrigation, mulching, and rainwater harvesting to minimize water usage and reduce runoff.",
        longDescription: `
## Water Conservation:
Water conservation is critical for sustainable agriculture, especially in regions facing water scarcity or erratic precipitation patterns. Efficient water management practices help farmers optimize water use, reduce runoff and leaching, and enhance water availability for crops while minimizing environmental impacts.

### Best Practices for Water Conservation:
- **Efficient Irrigation:** Adopting water-efficient irrigation techniques such as drip irrigation, micro-sprinklers, and furrow irrigation reduces water waste and improves water distribution efficiency.
- **Mulching:** Applying organic or synthetic mulch materials on the soil surface helps to reduce evaporation, suppress weed growth, and maintain soil moisture levels.
- **Rainwater Harvesting:** Collecting and storing rainwater runoff from rooftops, fields, or catchment areas provides an additional water source for irrigation, livestock watering, and household use during dry periods.
- **Soil Moisture Monitoring:** Monitoring soil moisture levels using sensors or manual methods allows farmers to optimize irrigation scheduling, avoid overwatering, and prevent water stress in crops.
- **Crop Selection and Timing:** Choosing drought-tolerant crop varieties and planting crops during optimal periods based on seasonal rainfall patterns help to conserve water and maximize crop productivity.
`,
    },
];

function Practices() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const handleClose = () => {
        setOpen(false);
        setSelected(null);
    };
    const handleOpen = (item) => {
        setOpen(true);
        setSelected(item - 1);
    };
    return (
        <Box>
            {/* Title */}
            <Typography level="h2" textAlign="center">
                Best Practices
            </Typography>
            <Grid
                container
                spacing={2}
                m={1}
                sx={{
                    overflowX: "auto",
                }}
            >
                {data.map((item) => (
                    <PracticesCard
                        key={item.id}
                        {...item}
                        handleOpen={handleOpen}
                    />
                ))}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <ModalDialog size="md">
                    <ModalClose />
                    <DialogTitle>{data[selected]?.title}</DialogTitle>
                    <DialogContent>
                        <Markdown>{data[selected]?.longDescription}</Markdown>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </Box>
    );
}
function PracticesCard({ id, title, src, description, handleOpen }) {
    return (
        <Grid
            xs={12}
            md={4}
            onClick={() => handleOpen(id)}
            style={{ cursor: "pointer", transition: "transform 0.4s" }}
        >
            <Card
                orientation="vertical"
                variant="outlined"
                sx={(theme) => ({
                    transition: "0.4s",
                    "&:hover": {
                        boxShadow: theme.shadow.xs,
                        transform: "scale(1.02)",
                    },
                })}
            >
                <CardOverflow>
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={src}
                            alt={title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography
                        level="title-lg"
                        textAlign="center"
                        color="primary"
                    >
                        {title}
                    </Typography>
                    {description && (
                        <Typography
                            level="body-md"
                            textAlign="center"
                            color="textSecondary"
                        >
                            {description}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}
export default Practices;
