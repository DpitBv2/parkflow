import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Background from "../components/background";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import IconButton from "../components/iconButton";
import IconInput from "../components/iconInput";
import { LogoText } from "../components/logo";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import { validateEmail } from "../util/util";
import Loading from "./loading";

const Login = ({ navigation, route }: { navigation: any; route: any }) => {
    const [registered, setRegistered] = useState<boolean>(false);

    if (registered == false) {
        try {
            const { registered: register } = route.params;
            setRegistered(true);
        } catch {}
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showError, setShowError] = useState(false);

    const { login }: any = useContext(AuthContext);

    const clearOnboarding = async () => {
        try {
            await AsyncStorage.removeItem("onboarding");
        } catch {
            console.log("Error clearing onboarding");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <Background opacity={0.5}>
            <KeyboardAvoidingView behavior="height">
                <View style={styles.background}>
                    <LogoText />

                    <View
                        style={{
                            width: 240,
                        }}>
                        {registered && (
                            <ErrorText
                                succesful
                                text="Registered successfully!"
                            />
                        )}
                        {showError && error && <ErrorText text={error} />}
                        {showError && error && (
                            <View style={{ marginBottom: 5 }} />
                        )}
                    </View>

                    <IconInput
                        icon="email"
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        validate={validateEmail}
                        errorEmpty={showError && !email}
                    />
                    <IconInput
                        icon="lock"
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                        style={{ marginTop: 10 }}
                        hidden={true}
                        errorEmpty={showError && !password}
                    />

                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.textContainer}>
                        <Text
                            style={{
                                marginVertical: 2,
                            }}>
                            Don't remember your password?
                        </Text>
                    </TouchableOpacity>

                    <Button
                        backgroundColor={theme().colors.primary}
                        color={theme().colors.light}
                        text="Log in"
                        onPress={() => {
                            if (!email || !password) setShowError(true);
                            else {
                                setIsLoading(true);
                                login(email.trim(), password)
                                    .then(() => {
                                        setIsLoading(false);
                                    })
                                    .catch((error: any) => {
                                        if (
                                            error.message ===
                                            "Request failed with status code 400"
                                        )
                                            setError(
                                                "Invalid email or password"
                                            );
                                        else setError(error.message);
                                        setShowError(true);
                                        setIsLoading(false);
                                    });
                            }
                        }}
                    />

                    <View style={styles.textContainer}>
                        <Text bold={true}>or</Text>
                    </View>

                    <IconButton
                        src={require("../../assets/images/icons/google.png")}
                        bgcolor={theme().colors.tomato}
                        color={theme().colors.white}
                        text="Continue with Google"
                        onPress={clearOnboarding}
                    />
                    <IconButton
                        src={require("../../assets/images/icons/facebook.png")}
                        bgcolor={theme().colors.blue}
                        color={theme().colors.white}
                        text="Continue with Facebook"
                        style={{ marginTop: 10 }}
                    />

                    <View style={styles.textContainer}>
                        <Text style={{ color: theme().colors.dark }}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            activeOpacity={ActiveOpacity}
                            onPress={() => {
                                navigation.navigate("Register");
                                setShowError(false);
                            }}>
                            <Text
                                bold={true}
                                color={theme().colors.lightBlue}
                                style={{
                                    color: theme().colors.lightBlue,
                                    marginLeft: 5,
                                }}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Background>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    background: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: theme().colors.background,
    },
});

export default Login;
