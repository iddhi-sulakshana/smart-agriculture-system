import { colors } from "@mui/joy";
import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#E8F5E9", // Very light green
                    100: "#C8E6C9", // Light green
                    200: "#A5D6A7", // Soft green
                    300: "#81C784", // Medium light green
                    400: "#66BB6A", // Medium green
                    500: "#4CAF50", // Default green
                    600: "#43A047", // Medium dark green
                    700: "#388E3C", // Dark green
                    800: "#2E7D32", // Very dark green
                    900: "#1B5E20", // Deepest green

                    outlinedBorder: "#C8E6C9", // Light green
                    outlinedActiveBg: "#A5D6A7", // Soft green
                    outlinedColor: "#66BB6A", // Medium green
                    outlinedDisabledBorder: "#E8F5E9", // Very light green
                    outlinedDisabledColor: "#E8F5E9", // Very light green
                    outlinedHoverBg: "#C8E6C9", // Light green
                    plainActiveBg: "#A5D6A7", // Soft green
                    plainColor: "#66BB6A", // Medium green
                    plainDisabledColor: "#E8F5E9", // Very light green
                    plainHoverBg: "#C8E6C9", // Light green
                    softActiveBg: "#81C784", // Medium light green
                    softActiveColor: "#2E7D32", // Very dark green
                    softBg: "#C8E6C9", // Light green
                    softColor: "#388E3C", // Dark green
                    softDisabledBg: "#E8F5E9", // Very light green
                    softDisabledColor: "#E8F5E9", // Very light green
                    softHoverBg: "#A5D6A7", // Soft green
                    solidActiveBg: "#388E3C", // Dark green
                    solidBg: "#4CAF50", // Default green
                    solidColor: "#FFFFFF", // White for contrast
                    solidDisabledBg: "#C8E6C9", // Light green
                    solidDisabledColor: "#E8F5E9", // Very light green
                    solidHoverBg: "#43A047", // Medium dark green
                },
                secondary: {
                    solidBg: "#8BC34A", // Light green
                    solidHoverBg: "#7CB342",
                    solidActiveBg: "#689F38",
                    solidDisabledBg: "#DCEDC8",
                    solidColor: "#000000", // Black text for contrast
                },
                text: {
                    icon: colors.green[400], // Green icon color
                },
                background: {
                    surface: "#FFFFFF", // White background
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    50: "#2E7D32", // Subdued light green
                    100: "#43A047", // Soft dark green
                    200: "#388E3C", // Medium dark green
                    300: "#2E7D32", // Dark green
                    400: "#1B5E20", // Very dark green
                    500: "#1B5E20", // Deepest green (used for default)
                    600: "#164016", // Even darker green
                    700: "#0F290F", // Very deep green
                    800: "#0A1E0A", // Near black green
                    900: "#071407", // Almost black green

                    outlinedBorder: "#43A047", // Soft dark green
                    outlinedActiveBg: "#388E3C", // Medium dark green
                    outlinedColor: "#2E7D32", // Dark green
                    outlinedDisabledBorder: "#2E7D32", // Dark green
                    outlinedDisabledColor: "#164016", // Even darker green
                    outlinedHoverBg: "#43A047", // Soft dark green
                    plainActiveBg: "#388E3C", // Medium dark green
                    plainColor: "#2E7D32", // Dark green
                    plainDisabledColor: "#164016", // Even darker green
                    plainHoverBg: "#43A047", // Soft dark green
                    softActiveBg: "#1B5E20", // Very dark green
                    softActiveColor: "#0A1E0A", // Near black green
                    softBg: "#43A047", // Soft dark green
                    softColor: "#1B5E20", // Very dark green
                    softDisabledBg: "#2E7D32", // Dark green
                    softDisabledColor: "#164016", // Even darker green
                    softHoverBg: "#388E3C", // Medium dark green
                    solidActiveBg: "#0F290F", // Very deep green
                    solidBg: "#1B5E20", // Deepest green
                    solidColor: "#FFFFFF", // White for contrast
                    solidDisabledBg: "#43A047", // Soft dark green
                    solidDisabledColor: "#2E7D32", // Dark green
                    solidHoverBg: "#164016", // Even darker green
                },
                secondary: {
                    solidBg: "#689F38", // Muted light green
                    solidHoverBg: "#558B2F",
                    solidActiveBg: "#33691E",
                    solidDisabledBg: "#C5E1A5",
                    solidColor: "#FFFFFF", // White text for contrast
                },
                text: {
                    icon: "#81C784", // Green icon color
                },
                background: {
                    surface: "#121212", // Very dark grey for background
                },
            },
        },
    },
});

export default theme;
