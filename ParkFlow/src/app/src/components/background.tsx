import { ImageBackground, StyleSheet, View } from "react-native";
import { theme } from "../util/theme";

const Background = ({
    children,
    opacity = 0.2,
}: {
    children: any;
    opacity?: number;
}) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                style={styles.image}
                resizeMode="cover"
                imageStyle={{ opacity }}>
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
