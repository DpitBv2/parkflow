import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/profile";
import DrawerNavigator from "./drawerNavigator";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Drawer Navigator" component={DrawerNavigator} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
};

export default AppStack;
