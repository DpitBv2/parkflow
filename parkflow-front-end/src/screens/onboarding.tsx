import { StyleSheet, View } from "react-native";
import Button from "../components/button";
import { theme } from "../theme/theme";

const Onboarding = ({ navigation }: { navigation: any }) => {
    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme().colors.background,
            }}>
            <Button
                bgcolor={theme().colors.primary}
                color={theme().colors.light}
                text="Let's Begin"
                height={40}
                onClick={() => navigation.navigate("Login")}
                style={{ ...styles.button }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {},
});

export default Onboarding;
