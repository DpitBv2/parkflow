import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Onboarding from "../screens/onboarding";
import Register from "../screens/register";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};

export default AuthStack;
