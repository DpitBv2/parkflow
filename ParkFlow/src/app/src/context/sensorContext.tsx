import { createContext, useState } from "react";
import api from "../util/api";
import { GetByIdURL, GetClosestSensorsURL } from "../util/links";

export const SensorContext = createContext<any>(null);

export const SensorProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getClosest = (
        token: string,
        latitude: number,
        longitude: number,
        number: number = 10
    ) => {
        return new Promise((resolve, reject) => {
            api.get(GetClosestSensorsURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    latitude,
                    longitude,
                    number,
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

    const getByID = (token: string, id: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetByIdURL + id, {
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
        <SensorContext.Provider value={{ getClosest, getByID }}>
            {children}
        </SensorContext.Provider>
    );
};
