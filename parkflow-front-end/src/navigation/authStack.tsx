import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Loading from "../screens/loading";
import Login from "../screens/login";
import Onboarding from "../screens/onboarding";
import Register from "../screens/register";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [onboarding, setOnboarding] = useState<boolean>(false);

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem("onboarding");

            if (value !== null) setOnboarding(true);
        } catch {
            console.log("Error checking onboarding");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkOnboarding();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {onboarding ? null : (
                <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};

export default AuthStack;
