import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import api from "../util/api";
import { LoginURL, RegisterURL, RoleURL, UserURL } from "../util/links";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            api.post(LoginURL, {
                email,
                password,
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
        phoneNumber: string
    ) => {
        console.log(phoneNumber);
        return new Promise((resolve, reject) => {
            api.post(RegisterURL, {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
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
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string
    ) => {
        return new Promise((resolve, reject) => {
            api.put(
                UserURL,
                {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) => {
                    getUserInfo(token);
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
            const userRole = await AsyncStorage.getItem("userRole");
            userInfo = JSON.parse(userInfo === null ? "{}" : userInfo);
            if (userInfo !== null) {
                setUserInfo(userInfo);
                setUserToken(userToken);
                setUserRole(userRole);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getRole = () => {
        return new Promise((resolve, reject) => {
            api.get(RoleURL, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
                .then((response) => {
                    resolve(response.data);
                    setUserRole(response.data);
                    console.log(response.data);
                    AsyncStorage.setItem("userRole", response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
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
                getRole,
                isLoading,
                userToken,
                userInfo,
                userRole,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
