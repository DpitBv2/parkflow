import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const LogoText = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/text.png")}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    image: {
        width: 160,
        height: 50,
        resizeMode: "contain",
    },
});
