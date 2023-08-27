import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

const OnboardingItem = ({ item }: { item: any }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image
                source={item.image}
                style={[styles.image, { width, resizeMode: "contain" }]}
            />
            <View style={{ flex: 0.2, justifyContent: "center", width: "80%" }}>
                <Text
                    fontSize={30}
                    bold
                    color={theme().colors.primary}
                    center
                    style={{ marginTop: 40, marginBottom: 10 }}>
                    {item.title}
                </Text>
                <Text fontSize={16} center>
                    {item.description}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 0.6,
        justifyContent: "center",
    },
});

export default OnboardingItem;
