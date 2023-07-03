import { View } from "react-native";
import Text from "../components/text";
import { theme } from "../theme/theme";

const Profile = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Text>Profile Screen</Text>
        </View>
    );
};

export default Profile;
