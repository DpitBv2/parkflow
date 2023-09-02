import { useContext, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { IconButton } from "react-native-paper";
import FIcon from "react-native-vector-icons/Feather";
import MIcon from "react-native-vector-icons/MaterialIcons";
import Background from "../components/background";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import Input from "../components/input";
import Modal from "../components/modal";
import PhoneInput from "../components/phoneInput";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity, CountryCodes } from "../util/constants";
import { theme } from "../util/theme";
import { getCountryCode } from "../util/util";
import Loading from "./loading";

const removeSpaceFromString = (string: string) => {
    return string.replace(/\s/g, "");
};

const removeCountryCode = (string: string) => {
    return string.replace(/^[^ ]* /, "");
};

const getCountryNumberCode = (string: string) => {
    return string.replace(/ .*/, "").slice(1);
};

//TODO: Fix the bug with the phone number not being updated when the user changes the default country

const Profile = ({ navigation }: { navigation: any }) => {
    const { userInfo, userToken, update } = useContext(AuthContext);

    const [editabble, setEditable] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [wantsToExit, setWantsToExit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>(userInfo?.firstName);
    const [lastName, setLastName] = useState<string>(userInfo?.lastName);
    const [phone, setPhone] = useState(
        removeCountryCode(userInfo?.phoneNumber)
    );
    const [phoneFormatted, setPhoneFormatted] = useState<string>(
        removeSpaceFromString(userInfo?.phoneNumber)
    );
    const [phoneValid, setPhoneValid] = useState<boolean>(true);

    if (isLoading) return <Loading />;

    return (
        <Background>
            <View style={styles.topContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (editabble) {
                            setVisible(true);
                            setWantsToExit(true);
                        } else navigation.goBack();
                    }}
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
                        setSuccess(false);
                        if (!showError && editabble) setShowError(true);
                        if (editabble && phoneValid && firstName && lastName) {
                            setShowError(false);
                            // if (
                            //     phoneFormatted !==
                            //         removeSpaceFromString(
                            //             userInfo?.phoneNumber
                            //         ) ||
                            //     firstName !== userInfo?.firstName ||
                            //     lastName !== userInfo?.lastName
                            // ) {
                            setVisible(true);
                            // } else {
                            //     setIsLoading(true);
                            //     setEditable(false);
                            //     setIsLoading(false);
                            // }
                        } else setEditable(true);
                    }}
                    animated
                />
            </View>
            <KeyboardAvoidingView behavior="height">
                <View style={styles.background}>
                    <View style={{ width: 100 }}>
                        <Image
                            source={require("../../assets/images/default/profile.png")}
                            style={styles.image}
                        />
                        {editabble && (
                            <IconButton
                                icon={"pencil"}
                                size={30}
                                iconColor={theme().colors.primary}
                                // containerColor={theme().colors.primary}
                                onPress={() => {}}
                                style={styles.icon}
                            />
                        )}
                    </View>

                    <View style={styles.email}>
                        <MIcon
                            name="email"
                            size={26}
                            color={theme().colors.grey}
                            style={{ marginRight: 5 }}
                        />
                        <Text
                            bold
                            fontSize={userInfo?.email.length > 20 ? 14 : 16}>
                            {userInfo?.email}
                        </Text>
                    </View>

                    {showError && (
                        <View
                            style={{
                                width: 240,
                            }}>
                            <View
                                style={{
                                    width: 240,
                                }}>
                                {success && (
                                    <ErrorText
                                        succesful
                                        text="Edited successfully!"
                                    />
                                )}
                                {showError && !phoneValid && (
                                    <ErrorText text="Phone number is not valid." />
                                )}
                                {showError && error && (
                                    <ErrorText text={error} />
                                )}
                            </View>
                        </View>
                    )}

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
                            autoCapitalize
                            maxLength={15}
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
                            autoCapitalize
                            maxLength={15}
                        />
                    </View>

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
                            editabble
                                ? theme().colors.dark
                                : theme().colors.grey
                        }
                        editable={editabble}
                        defaultCountry={
                            //@ts-ignore
                            CountryCodes[
                                getCountryNumberCode(userInfo?.phoneNumber)
                            ]
                        }
                    />

                    <TouchableOpacity activeOpacity={0.5}>
                        <Text
                            center
                            style={{
                                marginTop: 15,
                                marginBottom: 5,
                            }}>
                            Change your password?
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <Modal
                visible={visible}
                setVisible={setVisible}
                onClose={() => {
                    setVisible(false);
                    setWantsToExit(false);
                }}>
                <Text bold fontSize={18} style={{ paddingTop: 10 }} center>
                    Confirm edits?
                </Text>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        text="Save"
                        onPress={() => {
                            if (!phoneValid || !firstName || !lastName) {
                                setShowError(true);
                                setVisible(false);
                            } else {
                                setIsLoading(true);

                                update(
                                    userToken,
                                    firstName.trim(),
                                    lastName.trim(),
                                    userInfo?.email,
                                    getCountryCode(phone, phoneFormatted) +
                                        " " +
                                        phone
                                )
                                    .then(() => {
                                        setSuccess(true);
                                        setIsLoading(false);
                                        setShowError(true);
                                    })
                                    .catch((error: any) => {
                                        setError(error);
                                        setIsLoading(false);
                                        setShowError(true);
                                    });

                                setEditable(false);
                                setVisible(false);
                            }
                        }}
                        style={{ marginTop: 30 }}
                        width={wantsToExit ? 100 : 200}
                        backgroundColor={theme().colors.succes}
                    />
                    {wantsToExit && (
                        <Button
                            text="Exit"
                            onPress={() => {
                                setEditable(false);
                                setVisible(false);
                                navigation.goBack();
                            }}
                            style={{ marginTop: 30, marginLeft: 10 }}
                            width={100}
                            backgroundColor={theme().colors.danger}
                        />
                    )}
                </View>
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
    },
    background: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: theme().colors.background,
        alignItems: "center",
    },
    email: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        justifyContent: "center",
        marginLeft: -5,
        width: 240,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginVertical: 15,
        borderWidth: 2,
        // borderColor: theme().colors.primary,
    },
    icon: {
        position: "absolute",
        bottom: -5,
        right: -20,
    },
});

export default Profile;
