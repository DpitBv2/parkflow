import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawer from "../components/customDrawer";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import About from "../screens/about";
import Activity from "../screens/activity";
import Home from "../screens/home";
import Shop from "../screens/shop";
import Spots from "../screens/spots";
import { theme } from "../util/theme";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }: { navigation: any }) => {
    const { userRole } = useContext(AuthContext);

    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: 0,
                drawerStyle: {
                    width: "70%",
                    backgroundColor: theme().colors.background,
                    borderBottomEndRadius: 20,
                    borderTopEndRadius: 20,
                },
                drawerActiveTintColor: theme().colors.primary,
                drawerItemStyle: {
                    borderRadius: 10,
                },
            }}
            drawerContent={(props) => (
                <CustomDrawer props={props} navigation={navigation} />
            )}>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <FAIcon
                                name="home"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={24}
                            />
                        </View>
                    ),
                    drawerLabel: ({ focused }) => (
                        <View style={styles.text}>
                            <Text
                                bold={focused}
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.dark
                                }>
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Drawer.Screen
                name="Activity"
                component={Activity}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <FAIcon
                                name="receipt"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={23}
                            />
                        </View>
                    ),
                    drawerLabel: ({ focused }) => (
                        <View style={styles.text}>
                            <Text
                                bold={focused}
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.dark
                                }>
                                Activity
                            </Text>
                        </View>
                    ),
                }}
            />
            {(userRole === "CUSTOMER" || userRole === "ADMIN") && (
                <Drawer.Screen
                    name="My Spots"
                    component={Spots}
                    options={{
                        drawerIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <FAIcon
                                    name="parking"
                                    color={
                                        focused
                                            ? theme().colors.primary
                                            : theme().colors.grey
                                    }
                                    size={24}
                                />
                            </View>
                        ),
                        drawerLabel: ({ focused }) => (
                            <View style={styles.text}>
                                <Text
                                    bold={focused}
                                    color={
                                        focused
                                            ? theme().colors.primary
                                            : theme().colors.dark
                                    }>
                                    My Spots
                                </Text>
                            </View>
                        ),
                    }}
                />
            )}
            <Drawer.Screen
                name="Shop"
                component={Shop}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="cart"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={26}
                            />
                        </View>
                    ),
                    drawerLabel: ({ focused }) => (
                        <View style={styles.text}>
                            <Text
                                bold={focused}
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.dark
                                }>
                                Shop
                            </Text>
                        </View>
                    ),
                }}
            />
            <Drawer.Screen
                name="About"
                component={About}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="account-multiple"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={29}
                            />
                        </View>
                    ),
                    drawerLabel: ({ focused }) => (
                        <View style={styles.text}>
                            <Text
                                bold={focused}
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.dark
                                }>
                                About Us
                            </Text>
                        </View>
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    tabBar: {
        position: "absolute",
        bottom: 20,
        left: 15,
        right: 15,
        elevation: 0,
        backgroundColor: "#f2f2f2",
        borderRadius: 15,
        height: 60,
        paddingHorizontal: 5,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
    },
    buttonContainer: {
        top: -15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginHorizontal: 10,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        width: 100,
        marginLeft: -20,
    },
});

export default DrawerNavigator;
