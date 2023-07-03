import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../theme/theme";

interface IconInputProps {
    icon: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    style?: any;
    hidden?: boolean;
    letterSpacing?: number;
    validate?: (value: string) => boolean;
    onValidateChange?: (value: boolean) => void;
}

const IconInput = ({
    icon,
    placeholder,
    value,
    onChange,
    style,
    hidden = false,
    letterSpacing = 0.5,
    validate,
    onValidateChange,
}: IconInputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={[
                styles.container,
                style,
                {
                    backgroundColor: theme().colors.white,
                    borderColor: theme().colors.lightGrey,
                },
                isFocused && styles.focusedTextInput,
            ]}>
            <View style={styles.iconContainer}>
                <Icon
                    name={icon}
                    color={theme().colors.lightGrey}
                    style={{ marginLeft: 5 }}
                    size={24}
                />
            </View>
            <TextInput
                selectionColor={theme().colors.lightGrey}
                style={{ ...styles.input, letterSpacing: letterSpacing }}
                secureTextEntry={hidden}
                onChangeText={(text) => {
                    onChange(text);
                    if (
                        validate !== undefined &&
                        onValidateChange !== undefined
                    )
                        onValidateChange(validate(text));
                }}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={theme().colors.lightGrey}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        width: 250,
        height: 40,
    },
    input: {
        fontSize: 15,
        width: 200,
        paddingRight: 2,
        backgroundColor: "transparent",
        fontFamily: "AnekLatinRegular",
    },
    iconContainer: {
        height: 40,
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    focusedTextInput: {
        borderWidth: 2,
    },
});

export default IconInput;
