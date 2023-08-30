import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Loading from "../screens/loading";
import AppStack from "./appStack";
import AuthStack from "./authStack";

const AppNavigation = () => {
    const { isLoading, userToken }: any = useContext(AuthContext);

    if (isLoading) return <Loading />;

    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigation;
