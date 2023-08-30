import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import api from "../util/api";
import { LoginURL, UserURL } from "../util/links";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const login = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            api.post(LoginURL, {
                username: email,
                password: password,
            })
                .then((response) => {
                    getUserInfo(response.data)
                        .then(() => {
                            setUserToken(response.data);
                            AsyncStorage.setItem("userToken", response.data);
                            resolve(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const register = (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phone: string
    ) => {
        return new Promise((resolve, reject) => {
            api.post(LoginURL, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response.data.message);
                    reject(error);
                });
        });
    };

    const getUserInfo = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(UserURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setUserInfo(response.data);
                    AsyncStorage.setItem(
                        "userInfo",
                        JSON.stringify(response.data)
                    );
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const update = (
        token: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string
    ) => {
        return new Promise((resolve, reject) => {
            api.put(
                UserURL,
                {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) => {
                    setUserInfo(response.data);
                    resolve(response.data);
                })
                .catch((error) => {
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
            value={{
                login,
                logout,
                register,
                update,
                isLoading,
                userToken,
                userInfo,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
