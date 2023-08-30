import { StyleSheet, View } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

const ErrorText = ({
    text,
    style,
    succesful = false,
}: {
    text: string;
    style?: any;
    succesful?: boolean;
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text
                fontSize={25}
                bold={true}
                style={styles.dot}
                color={
                    succesful ? theme().colors.succes : theme().colors.danger
                }>
                °
            </Text>
            <Text
                bold={true}
                color={
                    succesful ? theme().colors.succes : theme().colors.danger
                }
                fontSize={text.length > 30 ? 14 : 15}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: -20,
    },
    dot: {
        marginRight: 10,
        marginTop: 10,
    },
});

export default ErrorText;
