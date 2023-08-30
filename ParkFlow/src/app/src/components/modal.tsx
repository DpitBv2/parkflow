import { Modal as RNModal, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
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
            <View style={styles.container}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        ...style,
                    }}>
                    <View
                        style={{
                            ...styles.modal,
                            backgroundColor: theme().colors.background,
                        }}>
                        <IconButton
                            icon="close"
                            iconColor={theme().colors.white}
                            containerColor={theme().colors.danger}
                            size={24}
                            style={styles.icon}
                            animated
                            onPress={onClose}
                        />
                        {children}
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        borderRadius: 20,
        padding: 20,
        paddingHorizontal: 30,
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    icon: {
        width: 35,
        height: 35,
        position: "absolute",
        top: 5,
        right: 5,
    },
});

export default Modal;
