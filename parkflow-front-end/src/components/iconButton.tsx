import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../components/text";

interface IconButtonProps {
    src: any;
    bgcolor?: string;
    color?: string;
    text: string;
    style?: any;
    onPress?: any;
}

const IconButton = ({
    src,
    bgcolor,
    color,
    text,
    style,
    onPress,
}: IconButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[{ backgroundColor: bgcolor }, styles.container, style]}
            onPress={onPress}>
            <View style={styles.gridContainer}>
                <View
                    style={[{ backgroundColor: color }, styles.iconContainer]}>
                    <Image style={styles.image} source={src} />
                </View>
                <View style={styles.textContainer}>
                    <Text inverted={true} style={styles.text}>
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: 250,
        height: 40,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    text: {
        fontSize: 15,
    },
    textContainer: {
        justifyContent: "center",
        marginLeft: 10,
    },
    gridContainer: {
        width: 250,
        height: 40,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        margin: 0,
        display: "flex",
        alignItems: "center",
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: -1,
    },
    image: {
        width: 25,
        height: 25,
        marginLeft: 3,
    },
});

export default IconButton;
