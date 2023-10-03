import { createContext } from "react";
import api from "../util/api";
import { ShopURL } from "../util/links";

export const ShopContext = createContext<any>(null);

export const ShopProvider = ({ children }: { children: any }) => {
    const purchase = (
        numberOfHubs: number,
        numberOfSensors: number,
        token: string
    ) => {
        return new Promise((resolve, reject) => {
            api.post(ShopURL, null, {
                params: {
                    numberOfHubs,
                    numberOfSensors,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return (
        <ShopContext.Provider
            value={{
                purchase,
            }}>
            {children}
        </ShopContext.Provider>
    );
};
