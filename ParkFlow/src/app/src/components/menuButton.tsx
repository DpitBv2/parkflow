import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

const MenuButton = ({
    navigation,
    style,
    onPress,
}: {
    navigation: any;
    style?: any;
    onPress?: any;
}) => {
    return (
        <TouchableOpacity
            activeOpacity={ActiveOpacity}
            onPress={() => {
                navigation.openDrawer(), Keyboard.dismiss();
                if (onPress) onPress();
            }}
            style={[styles.menu, style]}>
            <View>
                <View style={{ width: 25, ...styles.line }} />
                <View style={{ width: 20, ...styles.line }} />
                <View style={{ width: 15, ...styles.line }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menu: {
        height: 42,
        width: 42,
        borderRadius: 50,
        backgroundColor: theme().colors.white,
        justifyContent: "center",
        alignItems: "center",
    },
    line: {
        height: 3,
        backgroundColor: theme().colors.primary,
        borderRadius: 25,
        marginVertical: 2,
    },
});

export default MenuButton;
