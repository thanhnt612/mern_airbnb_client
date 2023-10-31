import { createContext, useEffect, useState } from 'react'
import { http } from '../../utils/config';
import { RootState } from '../../redux/configStore';
import { useSelector } from 'react-redux';



export const UserContext = createContext({});

export const UserContextProvider = ({ children }: any) => {
    const [userInfo, setUserInfo] = useState(null);
    const { token } = useSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        http.get('/user/profile',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(({ data }) => {
            setUserInfo(data);
        });
    }, [token]);
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}
