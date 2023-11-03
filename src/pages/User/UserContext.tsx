import { createContext, useEffect, useState } from 'react'
import { ACCESS_TOKEN, configStorage, http } from '../../utils/config';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        if (!userInfo) {
            async function refreshToken() {
                const refresh = await http.post('/user/refresh', {}, { withCredentials: true });
                configStorage.setCookieJson(ACCESS_TOKEN, refresh.data, 1)
                const result = await http.get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${refresh.data}`
                    }
                });
                setUserInfo(result.data);
            }
            refreshToken();
        }
    }, [])
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}
