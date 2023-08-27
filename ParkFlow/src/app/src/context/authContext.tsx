import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import api from "../util/api";
import { LoginURL } from "../util/links";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const login = ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        return new Promise((resolve, reject) => {
            // api.post(LoginURL, {
            //     email: email,
            //     password: password,
            // })
            //     .then((response) => {
            //         console.log(response.data);
            //         setUserInfo(response.data);
            //         setUserToken(response.data.token);
            //         AsyncStorage.setItem("userToken", response.data.token);
            //         AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
            //         resolve(response.data);
            //     })
            //     .catch((error) => {
            //         setError(error);
            //         reject(error);
            //     });

            setUserToken("dawdawdaw");
            setUserInfo("{}");
            AsyncStorage.setItem("userToken", "dawdawdaw");
            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        });
    };

    const register = ({
        firstName,
        lastName,
        email,
        password,
        phone,
    }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
    }) => {
        return new Promise((resolve, reject) => {
            api.post(LoginURL, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
            })
                .then((response) => {
                    console.log(response.data);
                    setUserInfo(response.data);
                    setUserToken(response.data.token);
                    AsyncStorage.setItem("userToken", response.data.token);
                    AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error sending data:", error);
                    setError(error);
                    reject(error);
                });
        });
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
            value={{ login, logout, register, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
