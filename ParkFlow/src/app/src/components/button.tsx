import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../components/text";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

interface ButtonProps {
    text: string;
    width?: any;
    height?: number;
    backgroundColor?: string;
    color?: string;
    style?: object;
    onPress?: () => void;
}

const Button = ({
    width = 250,
    height = 40,
    backgroundColor = theme().colors.primary,
    color,
    style,
    text,
    onPress,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={ActiveOpacity}
            style={[
                {
                    ...style,
                    ...styles.button,
                    height,
                    width,
                    backgroundColor,
                },
            ]}
            onPress={onPress}>
            <Text color={theme().colors.white} style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 40,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1.25,
    },
});

export default Button;
