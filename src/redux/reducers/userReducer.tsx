import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLogin } from '../../pages/Login/Login';
import { UserRegister } from '../../pages/Register/Register';
import {
    ACCESS_TOKEN,
    http,
    settings,
} from "../../utils/config";
import { DispatchType } from '../configStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../index';

export type EditProfile = {
    name: string,
}

export type UserProfileResult = {
    _id: string;
    email: string,
    name: string,
    createdAt: string;
}
type TokenResult = {
    access_token: string;
}
export type UserState = {
    userProfile?: UserProfileResult | null | undefined
    token?: TokenResult | null | undefined
}

const initialState = {
    userProfile: settings.getCookieJson(ACCESS_TOKEN)
        ? settings.getCookieJson(ACCESS_TOKEN)
        : {},
    token: settings.getCookieJson(ACCESS_TOKEN)
        ? settings.getCookieJson(ACCESS_TOKEN)
        : {},
}
const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserProfileAction: (state: UserState, action: PayloadAction<UserProfileResult>) => {
            state.userProfile = action.payload;
        },
        setTokenAction: (state: UserState, action: PayloadAction<TokenResult>) => {
            state.token = action.payload;
        },
    }
});

export const { setUserProfileAction, setTokenAction } = userReducer.actions

export default userReducer.reducer

export const registerApi = (register: UserRegister) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/register', register);
        if (result.data.status === 200) {
            toast.success('Sign Up Successfully !!!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => history.push('/user/login')
            });
        }
    };
};

export const loginApi = (userLogin: UserLogin) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/login', userLogin);
        const token = result.data.content.access_token
        if (result.data.status === 200) {
            toast.success('Login Successfully !!!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => history.push('/')
            });
        }
        if (result.data.status === 401) {
            toast.error("Email is not existed", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (result.data.status === 402) {
            toast.error("Email or password is wrong", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        dispatch(getProfileApi(token))
        const action: PayloadAction<TokenResult> = setTokenAction(token);
        dispatch(action);
        settings.setCookieJson(ACCESS_TOKEN, token, 1);
    }
}
export const getProfileApi = (token: String) => {
    return async (dispatch: DispatchType) => {
        const result = await http.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const action: PayloadAction<UserProfileResult> = setUserProfileAction(result.data);
        dispatch(action);
    }
}
export const updateProfileApi = (id: number, update: EditProfile) => {
    return async (dispatch: DispatchType) => {
        const result = await http.put('/user/update/' + id, update);
        if (result.data.status === 200) {
            toast.success('Your information updated !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/profile"
            });
            settings.setCookieJson(ACCESS_TOKEN, result.data.content, 1);
        }
    };
};