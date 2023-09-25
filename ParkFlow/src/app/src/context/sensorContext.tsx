import { createContext, useState } from "react";
import api from "../util/api";
import {
    GetClosestSensorsURL,
    GetSensorByIdURL,
    ReserveSensorURL,
} from "../util/links";

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
            api.get(GetSensorByIdURL + id, {
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

    const reserve = (token: string, id: number) => {
        return new Promise((resolve, reject) => {
            api.post(ReserveSensorURL, {
                params: {
                    sensorId: id,
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

    const endReservation = (
        token: string,
        id: number,
        paymentMethod: string
    ) => {
        return new Promise((resolve, reject) => {
            api.put(ReserveSensorURL, {
                params: {
                    sensorId: id,
                    paymentMethod,
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

    const park = (token: string, id: number) => {
        return new Promise((resolve, reject) => {
            api.put(ReserveSensorURL + id, {
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
        <SensorContext.Provider
            value={{ getClosest, getByID, reserve, endReservation, park }}>
            {children}
        </SensorContext.Provider>
    );
};
