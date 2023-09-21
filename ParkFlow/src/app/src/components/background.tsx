import { ImageBackground, StyleSheet, View } from "react-native";

const Background = ({
    children,
    opacity = 0.25,
    borderRadius = 0,
    padding = 0,
    flip,
}: {
    children: any;
    opacity?: number;
    borderRadius?: number;
    padding?: number;
    flip?: boolean;
}) => {
    return (
        <View style={{ ...styles.container, borderRadius }}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                style={styles.image}
                resizeMode="cover"
                imageStyle={{
                    opacity,
                    padding,
                    borderRadius,
                    transform: flip ? [{ rotateX: "180deg" }] : [],
                }}>
                {children}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Background;
