import {
    Modal as RNModal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

interface ModalProps {
    children: any;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    style?: any;
    onClose?: () => void;
}

const Modal = ({
    children,
    visible,
    setVisible,
    style,
    onClose,
}: ModalProps) => {
    return (
        <RNModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            style={{ top: 100 }}>
            <TouchableOpacity
                style={{ width: "100%", height: "100%" }}
                onPress={onClose}
                activeOpacity={1}>
                <View style={styles.container}>
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            ...style,
                        }}>
                        <TouchableWithoutFeedback>
                            <View style={{ ...styles.modal }}>
                                <TouchableOpacity
                                    activeOpacity={ActiveOpacity}
                                    style={styles.iconContainer}
                                    onPress={onClose}>
                                    <FAIcon
                                        name="times"
                                        color={theme().colors.white}
                                        size={20}
                                    />
                                </TouchableOpacity>
                                {children}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableOpacity>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modal: {
        borderRadius: 20,
        padding: 20,
        // alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: theme().colors.background,
    },
    iconContainer: {
        height: 35,
        width: 35,
        borderRadius: 100,
        backgroundColor: theme().colors.danger,

        position: "absolute",
        top: 10,
        right: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Modal;
