import { useContext } from "react";
import { View } from "react-native";
import Button from "../components/button";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { theme } from "../util/theme";

const Profile = () => {
    const { logout }: any = useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Text>Profile Screen</Text>

            <Button
                text="Log out"
                style={{ marginTop: 10 }}
                onClick={() => {
                    logout();
                }}
            />
        </View>
    );
};

export default Profile;
