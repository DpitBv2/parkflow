import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useContext, useState } from "react";
import {
    Image,
    Share,
    StyleSheet,
    TouchableHighlight,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Button from "./button";
import { LogoText } from "./logo";
import Modal from "./modal";
import Text from "./text";

const CustomDrawer = ({
    props,
    navigation,
}: {
    props: any;
    navigation: any;
}) => {
    const { userInfo, logout } = useContext(AuthContext);

    const [visible, setVisible] = useState<boolean>(false);

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: "ParkFlow",
                message:
                    "ParkFlow este o aplicație inovatoare dedicată reducerii traficului în orașe. Descoperă echipa noastră pe https://www.facebook.com/parkflowbv",
            });
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.top}>
                    <LogoText />
                    <View style={styles.profile}>
                        <Image
                            source={require("../../assets/images/default/profile.png")}
                            style={styles.image}
                        />
                        <View>
                            <Text bold fontSize={20}>
                                {userInfo.firstName} {userInfo.lastName}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={ActiveOpacity}
                                onPress={() => navigation.navigate("Profile")}>
                                <Text color={theme().colors.primary}>
                                    Edit profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottom}>
                <TouchableHighlight
                    onPress={onShare}
                    style={styles.button}
                    activeOpacity={ActiveOpacity}
                    underlayColor={theme().colors.lightGrey}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 25 }}>
                            <FAIcon
                                name="share-alt"
                                size={22}
                                color={theme().colors.primary}
                            />
                        </View>
                        <Text style={{ marginLeft: 10 }}>Tell a friend</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        setVisible(true);
                    }}
                    style={styles.button}
                    activeOpacity={ActiveOpacity}
                    underlayColor={theme().colors.lightGrey}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: 25 }}>
                            <FAIcon
                                name="sign-out-alt"
                                size={22}
                                color={theme().colors.primary}
                            />
                        </View>
                        <Text style={{ marginLeft: 10 }}>Log out</Text>
                    </View>
                </TouchableHighlight>

                <Modal
                    visible={visible}
                    setVisible={setVisible}
                    onClose={() => setVisible(false)}>
                    <Text bold fontSize={18} style={{ paddingTop: 10 }}>
                        Log out?
                    </Text>
                    <Button
                        text="Log out"
                        onPress={() => {
                            setVisible(false);
                            logout();
                        }}
                        style={{ marginTop: 30 }}
                        width={200}
                        bgcolor={theme().colors.danger}
                    />
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottom: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: theme().colors.lightGrey,
    },
    button: {
        padding: 10,
        width: "100%",
        borderRadius: 10,
    },
    top: {
        borderBottomWidth: 1,
        borderBottomColor: theme().colors.lightGrey,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    profile: {
        paddingBottom: 10,
        paddingHorizontal: 15,
        marginTop: -5,
        marginLeft: -15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        borderRadius: 50,
        width: 45,
        aspectRatio: 1,
        marginRight: 10,
        marginTop: 8,
    },
});

export default CustomDrawer;
