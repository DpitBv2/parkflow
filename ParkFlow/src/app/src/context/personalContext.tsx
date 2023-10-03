import { createContext } from "react";
import api from "../util/api";
import {
    GetPersonalHubs,
    GetPersonalHubsCount,
    GetPersonalHubsNotSetUp,
    GetPersonalHubsNotSetUpCount,
    GetPersonalSensors,
    GetPersonalSensorsCount,
    GetPersonalSensorsNotSetUp,
    GetPersonalSensorsNotSetUpCount,
} from "../util/links";

export const PersonalContext = createContext<any>(null);

export const PersonalProvider = ({ children }: { children: any }) => {
    const getSensors = (token: string, page: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalSensors, {
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

    const getSensorsCount = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalSensorsCount, {
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

    const getHubs = (token: string, page: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalHubs, {
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

    const getHubsCount = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalHubsCount, {
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

    const getSensorsNotSetUp = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalSensorsNotSetUp, {
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

    const getSensorsNotSetUpCount = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalSensorsNotSetUpCount, {
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

    const getHubsNotSetUp = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalHubsNotSetUp, {
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

    const getHubsNotSetUpCount = (token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetPersonalHubsNotSetUpCount, {
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
        <PersonalContext.Provider
            value={{
                getSensors,
                getSensorsCount,
                getHubs,
                getHubsCount,
                getSensorsNotSetUp,
                getSensorsNotSetUpCount,
                getHubsNotSetUp,
                getHubsNotSetUpCount,
            }}>
            {children}
        </PersonalContext.Provider>
    );
};
