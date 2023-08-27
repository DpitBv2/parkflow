import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Home from "../screens/home";
import Loading from "../screens/loading";
import AuthStack from "./authStack";

const AppNavigation = () => {
    const { isLoading, userToken }: any = useContext(AuthContext);

    if (isLoading) return <Loading />;

    return (
        <NavigationContainer>
            {userToken !== null ? <Home /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigation;
