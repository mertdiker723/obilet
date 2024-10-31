import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { GetSession } from '../apiRoutes/route';


interface GlobalContextType {
    value: any;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState<any>({});

    useEffect(() => {
        const getSession = async () => {
            try {
                const response = await axios.post(
                    GetSession,
                    {
                        "type": 7,
                        "connection": {
                            "ip-address": "94.55.230.63",
                            "port": "5117"
                        },
                        "browser": {
                            "name": "Chrome",
                            "version": "47.0.0.12"
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`,
                        },
                    }
                );
                setValue(response.data)
                return response.data;
            } catch (error) {
                throw error;
            }
        };

        getSession();
    }, [])

    return (
        <GlobalContext.Provider value={{ value }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useData = (): GlobalContextType => {
    const context = React.useContext(GlobalContext);
    if (!context) {
        throw new Error('useData must be used within a GlobalContextProvider');
    }
    return context;
};
