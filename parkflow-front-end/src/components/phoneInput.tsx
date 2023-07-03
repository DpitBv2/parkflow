import { createElement, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import PInput from "react-native-phone-number-input";
import { theme, themeType } from "../theme/theme";

const EmptyElement = createElement(View);

interface PhoneInputProps {
    style?: any;
    setValue: (value: string) => void;
    value: string;
    formattedValue?: string;
    setFormattedValue?: (value: string) => void;
    valid: boolean;
    setValid: (value: boolean) => void;
}

const PhoneInput = ({
    style,
    value,
    setValue,
    formattedValue,
    setFormattedValue,
    valid,
    setValid,
}: any) => {
    const phoneInput = useRef<PInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(!isFocused);
    };

    return (
        <View style={{ ...style, position: "relative" }}>
            <PInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="RO"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);

                    const checkValid = phoneInput.current?.isValidNumber(text);
                    setValid(checkValid ? checkValid : false);
                }}
                containerStyle={[
                    styles.container,
                    {
                        backgroundColor: theme().colors.white,
                        borderColor: theme().colors.lightGrey,
                    },
                    isFocused && styles.focusedTextInput,
                ]}
                textContainerStyle={{
                    ...styles.text,
                }}
                textInputStyle={{
                    ...styles.input,
                    color: theme().colors.darkGrey,
                }}
                codeTextStyle={{
                    ...styles.code,
                }}
                renderDropdownImage={EmptyElement}
                countryPickerButtonStyle={{ ...styles.button }}
                {...(themeType() === "dark" && {
                    withDarkTheme: true,
                })}
                textInputProps={{
                    cursorColor: theme().colors.lightGrey,
                    selectionColor: theme().colors.lightGrey,
                }}
                flagButtonStyle={{ marginTop: -1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 40,
        width: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        borderTopEndRadius: 25,
        borderBottomEndRadius: 25,
        marginLeft: -40,
        backgroundColor: "transparent",
    },
    input: {
        fontSize: 15,
        fontFamily: "AnekLatinRegular",
        letterSpacing: 0.5,
        marginLeft: -5,
        height: 35,
    },
    code: {
        fontSize: 15,
        fontFamily: "AnekLatinRegular",
        letterSpacing: 0.5,
        height: 20,
    },
    button: {
        marginLeft: -10,
    },
    focusedTextInput: {
        borderWidth: 2,
    },
});

export default PhoneInput;
