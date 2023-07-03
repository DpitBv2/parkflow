import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../components/button";
import IconButton from "../components/iconButton";
import IconInput from "../components/iconInput";
import Input from "../components/input";
import PhoneInput from "../components/phoneInput";
import Text from "../components/text";
import { theme } from "../theme/theme";
import { validateEmail } from "../util/validate";

const Register = ({ navigation }: { navigation: any }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneFormatted, setPhoneFormatted] = useState("");
    const [phoneValid, setPhoneValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme().colors.background },
            ]}>
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
                />
                <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={setLastName}
                    style={{ width: 120, marginLeft: 10 }}
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
            />

            <PhoneInput
                value={phone}
                setValue={setPhone}
                formattedValue={phoneFormatted}
                setFormattedValue={setPhoneFormatted}
                valid={phoneValid}
                setValid={setPhoneValid}
                style={{ marginTop: 10 }}
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
                <Text style={{ color: theme().colors.dark, marginVertical: 2 }}>
                    Don't remember your password?
                </Text>
            </TouchableOpacity>

            <Button
                bgcolor={theme().colors.primary}
                color={theme().colors.light}
                text="Register"
                onClick={() => {
                    console.log(phone);
                    // axios
                    //     .post(RegisterURL, {
                    //         firstName: firstName,
                    //         lastName: lastName,
                    //         email: email,
                    //         phoneNumber: phoneNumber,
                    //         password: password,
                    //     })
                    //     .then((response) => {
                    //         console.log("Data send successfully");
                    //         console.log(response.data);
                    //     })
                    //     .catch((error) => {
                    //         console.error("Error sending data:", error);
                    //     });
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
                    Already have an account?
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}>
                    <Text
                        bold={true}
                        style={[
                            {
                                color: theme().colors.lightBlue,
                                marginLeft: 5,
                            },
                        ]}>
                        Log in
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

export default Register;
