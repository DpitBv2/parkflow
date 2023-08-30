import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../components/text";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

interface ButtonProps {
    text: string;
    width?: number;
    height?: number;
    bgcolor?: string;
    color?: string;
    style?: object;
    onPress?: () => void;
}

const Button = ({
    width = 250,
    height = 40,
    bgcolor,
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
                    height: height,
                    width: width,
                    backgroundColor:
                        bgcolor === undefined
                            ? theme().colors.primary
                            : bgcolor,
                },
            ]}
            onPress={onPress}>
            <Text
                inverted={true}
                style={[
                    styles.text,
                    // {
                    //     color:
                    //         color === undefined ? theme().colors.light : color,
                    // },
                ]}>
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
