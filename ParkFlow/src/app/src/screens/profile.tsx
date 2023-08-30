import { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import FIcon from "react-native-vector-icons/Feather";
import Background from "../components/background";
import Button from "../components/button";
import IconInput from "../components/iconInput";
import Input from "../components/input";
import Modal from "../components/modal";
import PhoneInput from "../components/phoneInput";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import { validateEmail } from "../util/validate";

const Profile = ({ navigation }: { navigation: any }) => {
    const { userInfo } = useContext(AuthContext);

    const [editabble, setEditable] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    const [showError, setShowError] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>(userInfo?.firstName);
    const [lastName, setLastName] = useState<string>(userInfo?.lastName);
    const [email, setEmail] = useState<string>(userInfo?.email);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [phone, setPhone] = useState("XXXXXXX");
    const [phoneFormatted, setPhoneFormatted] = useState<string>("");
    const [phoneValid, setPhoneValid] = useState<boolean>(true);

    return (
        <Background>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={ActiveOpacity}
                    style={styles.back}>
                    <FIcon
                        name="chevron-left"
                        size={40}
                        color={theme().colors.dark}
                        style={{ marginLeft: -3 }}
                    />
                </TouchableOpacity>
                <Text bold fontSize={24} center style={styles.text}>
                    Profile
                </Text>
                <IconButton
                    icon={editabble ? "content-save" : "pencil"}
                    size={25}
                    iconColor={theme().colors.white}
                    containerColor={theme().colors.primary}
                    onPress={() => {
                        if (editabble) setVisible(true);
                        else setEditable(true);
                    }}
                    animated
                />
            </View>
            <View>
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
                        color={
                            editabble
                                ? theme().colors.dark
                                : theme().colors.grey
                        }
                        editable={editabble}
                    />
                    <Input
                        placeholder="Last name"
                        value={lastName}
                        onChange={setLastName}
                        style={{ width: 120, marginLeft: 10 }}
                        errorEmpty={showError && !lastName}
                        color={
                            editabble
                                ? theme().colors.dark
                                : theme().colors.grey
                        }
                        editable={editabble}
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
                    color={
                        editabble ? theme().colors.dark : theme().colors.grey
                    }
                    editable={editabble}
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
                    color={
                        editabble ? theme().colors.dark : theme().colors.grey
                    }
                    editable={editabble}
                />

                <TouchableOpacity activeOpacity={0.5}>
                    <Text
                        center
                        style={{
                            marginVertical: 2,
                        }}>
                        Don't remember your password?
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={visible}
                setVisible={setVisible}
                onClose={() => setVisible(false)}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }}>
                    Confirm edits?
                </Text>
                <Button
                    text="Save"
                    onPress={() => {
                        setEditable(false);
                        setVisible(false);
                    }}
                    style={{ marginTop: 30 }}
                    width={200}
                    bgcolor={theme().colors.succes}
                />
            </Modal>
        </Background>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: "absolute",
        top: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        flex: 1,
    },
    back: {
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: theme().colors.primary,
    },
});

export default Profile;
