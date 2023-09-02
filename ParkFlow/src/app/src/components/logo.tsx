import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const LogoText = ({ style }: { style?: any }) => {
    return (
        <View style={[styles.container, style]}>
            <Image
                source={require("../../assets/text.png")}
                style={styles.image}
            />
        </View>
    );
};

export const Logo = ({ style }: { style?: any }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/logo.png")}
                style={[styles.image2, style]}
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
    image2: {
        width: 50,
        height: 50,
        aspectRatio: 1,
        resizeMode: "contain",
    },
});
