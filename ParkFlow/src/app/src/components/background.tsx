import { ImageBackground, StyleSheet, View } from "react-native";
import { theme } from "../util/theme";

const Background = ({
    children,
    opacity = 0.2,
    borderRadius = 0,
    padding = 0,
}: {
    children: any;
    opacity?: number;
    borderRadius?: number;
    padding?: number;
}) => {
    return (
        <View style={{ ...styles.container, borderRadius }}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                style={styles.image}
                resizeMode="cover"
                imageStyle={{ opacity, padding, borderRadius }}>
                {children}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme().colors.white,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Background;
