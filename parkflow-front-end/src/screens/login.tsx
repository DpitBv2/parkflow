import { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import IconButton from "../components/iconButton";
import IconInput from "../components/iconInput";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { theme } from "../theme/theme";
import { validateEmail } from "../util/validate";

const Login = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState(false);

    const { login }: any = useContext(AuthContext);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme().colors.background },
            ]}>
            <IconInput
                icon="email"
                placeholder="Email"
                value={email}
                onChange={setEmail}
                validate={validateEmail}
                onValidateChange={setEmailValid}
            />
            <IconInput
                icon="lock"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                style={{ marginTop: 10 }}
                hidden={true}
            />

            <TouchableOpacity activeOpacity={0.5} style={styles.textContainer}>
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
                    login(email, password);
                }}
            />

            <View>
                <Text
                    bold={true}
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                        fontWeight: "600",
                        color: theme().colors.dark,
                    }}>
                    or
                </Text>
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
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Register")}>
                    <Text
                        bold={true}
                        style={{
                            color: theme().colors.lightBlue,
                            marginLeft: 5,
                        }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
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
    },
});

export default Login;
