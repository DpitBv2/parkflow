import { useColorScheme } from "react-native";
import { MD3LightTheme } from "react-native-paper";

const defaultTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,

        white: "#f2f2f2",
        black: "#1a1a1a",
        grey: "#4d4d4d",
        blue: "#0a58d1",
        lightBlue: "#3b7cf9",
        lightGrey: "#797370",
        darkGrey: "#2d2d2d",
    },
};

export const lightTheme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "#e83635",
        secondary: "#ffdf00",

        background: "#ffffff",
        light: "#f2f2f2",
        dark: "#1a1a1a",
    },
};

export const darkTheme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "blue",
        secondary: "yellow",

        background: "#1a1a1a",
        light: "#1a1a1a",
        dark: "#f2f2f2",
    },
};

export const theme = () => {
    const scheme = useColorScheme();
    return scheme === "dark" ? darkTheme : lightTheme;
};

export const themeType = () => {
    const scheme = useColorScheme();
    return scheme === "dark" ? "dark" : "light";
};
