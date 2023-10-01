import { MD3LightTheme } from "react-native-paper";

const defaultTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,

        white: "#ffffff",
        black: "#1a1a1a",
        grey: "#7f7f7f",
        blue: "#0a58d1",
        lightBlue: "#3b7cf9",
        lightGrey: "#bebebe",
        darkGrey: "#2d2d2d",
        danger: "#e83635",
        tomato: "#f5593d",
        succes: "#00b16a",
    },
};

export const lightTheme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "#1B52C1",
        secondary: "#ffdf00",

        background: "#f4f4f4",
        light: "#f2f2f2",
        dark: "#1a1a1a",
    },
};

export const darkTheme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        primary: "#73a5c6",
        secondary: "yellow",

        background: "#3f3f3f",
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
    // const scheme = useColorScheme();
    // return scheme === "dark" ? "dark" : "light";
    return "light";
};
