import { View } from "react-native";
import Text from "../components/text";
import { theme } from "../util/theme";

const Map = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Text>Map Screen</Text>
        </View>
    );
};

export default Map;
