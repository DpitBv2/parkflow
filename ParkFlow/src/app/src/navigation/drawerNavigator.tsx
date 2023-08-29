import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawer from "../components/customDrawer";
import Text from "../components/text";
import Activity from "../screens/activity";
import Home from "../screens/home";
import Map from "../screens/map";
import Profile from "../screens/profile";
import Shop from "../screens/shop";
import { theme } from "../util/theme";

const Drawer = createDrawerNavigator();

// const TabBarButton = ({
//     children,
//     onPress,
// }: {
//     children: any;
//     onPress: () => void;
// }) => {
//     return (
//         <TouchableOpacity
//             activeOpacity={ActiveOpacity}
//             onPress={onPress}
//             style={{
//                 ...styles.buttonContainer,
//                 ...styles.shadow,
//                 shadowColor: theme().colors.grey,
//                 shadowOffset: {
//                     width: 0,
//                     height: 5,
//                 },
//             }}>
//             <View
//                 style={{
//                     ...styles.button,
//                     backgroundColor: theme().colors.primary,
//                 }}>
//                 {children}
//             </View>
//         </TouchableOpacity>
//     );
// };

const DrawerNavigator = () => {
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
            drawerContent={(props) => <CustomDrawer {...props} />}>
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
                                // style={{ marginLeft: 5 }}
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
            <Drawer.Screen
                name="Map"
                component={Map}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="map"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={27}
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
                                Map
                            </Text>
                        </View>
                    ),
                }}
            />
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
                name="Profile"
                component={Profile}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="account"
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
                                Profile
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
