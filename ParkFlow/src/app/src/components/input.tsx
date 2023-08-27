import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Font, LetterSpacing } from "../util/constants";
import { theme } from "../util/theme";

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    style?: any;
    hidden?: boolean;
    errorEmpty?: boolean;
}

const Input = ({
    placeholder,
    value,
    onChange,
    style,
    hidden,
    errorEmpty = false,
}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={[
                styles.container,
                style,
                {
                    backgroundColor: theme().colors.white,
                    borderWidth: 2,
                    borderColor: "transparent",
                },
                // isFocused && { borderColor: theme().colors.grey },
                errorEmpty && {
                    borderColor: theme().colors.danger,
                    borderWidth: 2,
                },
            ]}>
            <TextInput
                style={styles.input}
                secureTextEntry={hidden}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={theme().colors.grey}
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                selectionColor={theme().colors.grey}
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
        width: "100%",
        paddingLeft: 10,
        paddingRight: 8,
        backgroundColor: "transparent",
        marginLeft: 2,
        fontFamily: Font.regular,
        letterSpacing: LetterSpacing,
    },
});

export default Input;
