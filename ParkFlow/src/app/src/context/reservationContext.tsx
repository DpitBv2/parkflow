import { createContext, useState } from "react";
import api from "../util/api";
import { GetAllReservations } from "../util/links";

export const ReservationContext = createContext<any>(null);

export const ReservationProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getAll = (token: string, page: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetAllReservations, {
                params: {
                    page,
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

    const getCount = (token: string, page: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetAllReservations, {
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
        <ReservationContext.Provider value={{ getAll }}>
            {children}
        </ReservationContext.Provider>
    );
};
