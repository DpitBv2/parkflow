import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../theme/theme";

const Loading = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
            }}>
            <ActivityIndicator size="large" color={theme().colors.primary} />
        </View>
    );
};

export default Loading;
