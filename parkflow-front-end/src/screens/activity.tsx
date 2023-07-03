import { View } from "react-native";
import Text from "../components/text";
import { theme } from "../theme/theme";

const Activity = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Text>Activity Screen</Text>
        </View>
    );
};

export default Activity;
