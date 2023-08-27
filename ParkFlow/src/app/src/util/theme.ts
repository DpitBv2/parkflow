import { useColorScheme } from "react-native";
import { MD3LightTheme } from "react-native-paper";

const defaultTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,

        white: "#f2f2f2",
        black: "#1a1a1a",
        grey: "#7f7f7f",
        blue: "#0a58d1",
        lightBlue: "#3b7cf9",
        lightGrey: "#bebebe",
        darkGrey: "#2d2d2d",
        danger: "#e83635",
        tomato: "#f5593d",
    },
};

export const lightTheme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "#1B52C1",
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
    // const scheme = useColorScheme();
    // return scheme === "dark" ? darkTheme : lightTheme;
    // render more hooks bug
    return lightTheme;
};

export const themeType = () => {
    const scheme = useColorScheme();
    return scheme === "dark" ? "dark" : "light";
};
