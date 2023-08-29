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
import Input from "../components/input";
import { LogoText } from "../components/logo";
import PhoneInput from "../components/phoneInput";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import { validateEmail } from "../util/validate";
import Loading from "./loading";

const Register = ({ navigation }: { navigation: any }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneFormatted, setPhoneFormatted] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    const { register }: any = useContext(AuthContext);

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
                        {showError && !emailValid && (
                            <ErrorText text="Email is not valid." />
                        )}
                        {showError && !phoneValid && (
                            <ErrorText text="Phone number is not valid." />
                        )}
                        {showError && password !== confirmPassword && (
                            <ErrorText text="Passwords don't match" />
                        )}
                        {showError && password && password.length <= 4 && (
                            <ErrorText text="Password too short" />
                        )}
                        {showError && error && <ErrorText text={error} />}
                        {showError && <View style={{ marginBottom: 5 }} />}
                    </View>

                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Input
                            placeholder="First name"
                            value={firstName}
                            onChange={setFirstName}
                            style={{ width: 120 }}
                            errorEmpty={showError && !firstName}
                        />
                        <Input
                            placeholder="Last name"
                            value={lastName}
                            onChange={setLastName}
                            style={{ width: 120, marginLeft: 10 }}
                            errorEmpty={showError && !lastName}
                        />
                    </View>

                    <IconInput
                        icon="email"
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        validate={validateEmail}
                        onValidateChange={setEmailValid}
                        style={{ marginTop: 10 }}
                        errorEmpty={showError && !email}
                    />

                    <PhoneInput
                        value={phone}
                        setValue={setPhone}
                        formattedValue={phoneFormatted}
                        setFormattedValue={setPhoneFormatted}
                        valid={phoneValid}
                        setValid={setPhoneValid}
                        style={{ marginTop: 10 }}
                        errorEmpty={showError && !phone}
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

                    <IconInput
                        icon="lock"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        style={{ marginTop: 10 }}
                        hidden={true}
                        errorEmpty={showError && !confirmPassword}
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
                        text="Register"
                        onClick={() => {
                            if (
                                firstName &&
                                lastName &&
                                email &&
                                phone &&
                                password &&
                                confirmPassword &&
                                emailValid &&
                                phoneValid &&
                                password === confirmPassword &&
                                password.length > 4
                            ) {
                                setIsLoading(true);
                                register(
                                    firstName,
                                    lastName,
                                    email,
                                    password,
                                    phone
                                )
                                    .then(() => {
                                        setIsLoading(false);
                                    })
                                    .catch((error: any) => {
                                        setError(error.message);
                                        setShowError(true);
                                        setIsLoading(false);
                                    });
                            } else setShowError(true);
                        }}
                    />

                    <View style={styles.textContainer}>
                        <Text
                            bold={true}
                            style={{
                                color: theme().colors.dark,
                            }}>
                            or
                        </Text>
                    </View>

                    <IconButton
                        src={require("../../assets/images/icons/google.png")}
                        bgcolor={theme().colors.tomato}
                        color={theme().colors.white}
                        text="Continue with Google"
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
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            activeOpacity={ActiveOpacity}
                            onPress={() => navigation.navigate("Login")}>
                            <Text
                                bold={true}
                                color={theme().colors.lightBlue}
                                style={{
                                    marginLeft: 5,
                                }}>
                                Log in
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
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    background: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: theme().colors.background,
    },
});

export default Register;
