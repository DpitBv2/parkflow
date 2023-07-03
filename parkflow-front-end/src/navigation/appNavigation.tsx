import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Loading from "../screens/loading";
import AuthStack from "./authStack";
import TabNavigator from "./tabNavigator";

const AppNavigation = () => {
    const { isLoading, userToken }: any = useContext(AuthContext);

    if (isLoading) return <Loading />;

    return (
        <NavigationContainer>
            {userToken !== null ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigation;
