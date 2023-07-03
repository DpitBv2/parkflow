import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme/theme";

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    style?: any;
    hidden?: boolean;
}

const Input = ({ placeholder, value, onChange, style, hidden }: InputProps) => {
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
                // isFocused && styles.focusedTextInput,
            ]}>
            <TextInput
                style={styles.input}
                secureTextEntry={hidden}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={theme().colors.lightGrey}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                selectionColor={theme().colors.lightGrey}
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
        fontFamily: "AnekLatinRegular",
        letterSpacing: 0.4,
    },
    focusedTextInput: {
        borderWidth: 2,
    },
});

export default Input;
