import { Text as DefaultText, StyleSheet } from "react-native";
import { Font, LetterSpacing } from "../util/constants";
import { theme } from "../util/theme";

interface TextProps {
    children: any;
    style?: any;
    bold?: boolean;
    inverted?: boolean;
    color?: string;
    fontSize?: number;
    center?: boolean;
    numberOfLines?: number;
}

const Text = ({
    children,
    style,
    bold,
    inverted = false,
    color,
    fontSize = 15,
    center = false,
    numberOfLines,
}: TextProps) => {
    return (
        <DefaultText
            numberOfLines={numberOfLines}
            style={[
                style,
                bold ? styles.bold : styles.regular,
                { fontSize: fontSize, letterSpacing: LetterSpacing },
                center ? { textAlign: "center" } : {},
                inverted
                    ? { color: theme().colors.light }
                    : { color: theme().colors.dark },
                color !== undefined ? { color: color } : {},
            ]}>
            {children}
        </DefaultText>
    );
};

const styles = StyleSheet.create({
    regular: {
        fontFamily: Font.regular,
    },
    bold: {
        fontWeight: "bold",
        fontFamily: Font.bold,
    },
});

export default Text;
