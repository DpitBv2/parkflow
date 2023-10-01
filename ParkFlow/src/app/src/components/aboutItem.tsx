import { Image, StyleSheet, View } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

interface AboutItemProps {
    name: string;
    description: string;
    image: any;
}

const AboutItem = ({ name, description, image }: AboutItemProps) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text fontSize={18} bold center style={{ marginTop: 10 }}>
                {name}
            </Text>
            <Text fontSize={15} bold center color={theme().colors.primary}>
                {description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 175,
        borderRadius: 20,
        borderColor: theme().colors.primary,
        borderWidth: 2,
    },
    container: {
        width: "40%",
        margin: 20,
    },
});

export default AboutItem;
