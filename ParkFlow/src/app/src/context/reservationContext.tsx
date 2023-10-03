import { createContext } from "react";
import api from "../util/api";
import {
    GetAllReservations,
    GetReservationsCost,
    GetReservationsCount,
} from "../util/links";

export const ReservationContext = createContext<any>(null);

export const ReservationProvider = ({ children }: { children: any }) => {
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

    const getCount = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetReservationsCount, {
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

    const getCost = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetReservationsCost, {
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
        <ReservationContext.Provider value={{ getAll, getCount, getCost }}>
            {children}
        </ReservationContext.Provider>
    );
};
