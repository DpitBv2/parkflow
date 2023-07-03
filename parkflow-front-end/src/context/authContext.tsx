import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    const login = ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        setIsLoading(true);

        // axios
        //     .post(LoginURL, {
        //         email: email,
        //         password: password,
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //         setUserInfo(response.data);
        //         setUserToken(response.data.token);
        //         AsyncStorage.setItem("userToken", userToken);
        //         AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        //     })
        //     .catch((error) => {
        //         console.error("Error sending data:", error);
        //     });

        setUserToken("dawdawdaw");
        setUserInfo("{}");
        AsyncStorage.setItem("userToken", "dawdawdaw");
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        setIsLoading(false);
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("userToken");
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem("userInfo");
            const userToken = await AsyncStorage.getItem("userToken");
            userInfo = JSON.parse(userInfo === null ? "{}" : userInfo);
            if (userInfo !== null) {
                setUserInfo(userInfo);
                setUserToken(userToken);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
