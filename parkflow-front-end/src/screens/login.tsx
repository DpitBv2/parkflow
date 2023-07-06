import { useContext, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import IconButton from "../components/iconButton";
import IconInput from "../components/iconInput";
import Text from "../components/text";
import { ActiveOpacity } from "../constants/constants";
import { theme } from "../constants/theme";
import { AuthContext } from "../context/authContext";
import { validateEmail } from "../util/validate";

const Login = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showError, setShowError] = useState(false);

    const { login }: any = useContext(AuthContext);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme().colors.background },
            ]}>
            <KeyboardAvoidingView behavior="height">
                <View
                    style={{
                        width: 240,
                    }}>
                    {showError && error && <ErrorText text={error} />}
                    {showError && error && <View style={{ marginBottom: 5 }} />}
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
                            color: theme().colors.dark,
                            marginVertical: 2,
                        }}>
                        Don't remember your password?
                    </Text>
                </TouchableOpacity>

                <Button
                    bgcolor={theme().colors.primary}
                    color={theme().colors.light}
                    text="Log in"
                    onClick={() => {
                        if (!email || !password) setShowError(true);
                        else
                            login(email, password).catch((error: any) => {
                                setError(error.message);
                                setShowError(true);
                            });
                    }}
                />

                <View style={styles.textContainer}>
                    <Text bold={true}>or</Text>
                </View>

                <IconButton
                    src={require("../../assets/images/google.png")}
                    bgcolor={theme().colors.blue}
                    color={theme().colors.white}
                    text="Continue with Google"
                />
                <IconButton
                    src={require("../../assets/images/github.png")}
                    bgcolor={theme().colors.black}
                    color={theme().colors.grey}
                    text="Continue with GitHub"
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
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    textContainer: {
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Login;
