import { Text as DefaultText, StyleSheet } from "react-native";

interface TextProps {
    children: any;
    style?: any;
    bold?: boolean;
}

const Text = ({ children, style, bold }: TextProps) => {
    return (
        <DefaultText
            style={[style, styles.text, bold ? styles.bold : styles.regular]}>
            {children}
        </DefaultText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        letterSpacing: 0.5,
    },
    regular: {
        fontFamily: "AnekLatinRegular",
    },
    bold: {
        fontFamily: "AnekLatinBold",
    },
});

export default Text;
