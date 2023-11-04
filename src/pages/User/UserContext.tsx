import { createContext, useEffect, useState } from 'react'
import { http } from '../../utils/config';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        if (!userInfo) {
            async function refreshToken() {
                const refresh = await http.post('/user/refresh', {}, { withCredentials: true });
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
