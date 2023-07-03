import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Activity from "../screens/activity";
import Home from "../screens/home";
import Map from "../screens/map";
import Profile from "../screens/profile";
import Shop from "../screens/shop";
import { theme } from "../theme/theme";

const Tab = createBottomTabNavigator();

const TabBarButton = ({
    children,
    onPress,
}: {
    children: any;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
                ...styles.buttonContainer,
                ...styles.shadow,
                shadowColor: theme().colors.lightGrey,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
            }}>
            <View
                style={{
                    ...styles.button,
                    backgroundColor: theme().colors.primary,
                }}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    ...styles.tabBar,
                    ...styles.shadow,
                    shadowColor: theme().colors.lightGrey,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <FAIcon
                                name="home"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.lightGrey
                                }
                                // style={{ marginLeft: 5 }}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Activity"
                component={Activity}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <FAIcon
                                name="receipt"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.lightGrey
                                }
                                size={23}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="map"
                                color={
                                    focused
                                        ? theme().colors.secondary
                                        : theme().colors.white
                                }
                                size={27}
                            />
                        </View>
                    ),
                    tabBarButton: (props) => (
                        <TabBarButton
                            children={props.children}
                            onPress={() => {}}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Shop"
                component={Shop}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="cart"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.lightGrey
                                }
                                size={26}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="account"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.lightGrey
                                }
                                size={29}
                            />
                        </View>
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Settings"
                component={() => {
                    return <></>;
                }}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="cog"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.lightGrey
                                }
                                size={25}
                            />
                        </View>
                    ),
                }}
            /> */}
        </Tab.Navigator>
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
});

export default TabNavigator;
