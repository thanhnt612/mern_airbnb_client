import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLogin } from '../../pages/Login/Login';
import { EditProfile } from '../../pages/Profile/Profile';
import { UserRegister } from '../../pages/Register/Register';
import {
    http,
    settings,
    USER_LOGIN
} from "../../utils/config";
import { DispatchType } from '../configStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../index';

type UserLoginResult = {
    email: string;
    accessToken: string;
}
export type UserState = {
    userLogin?: UserLoginResult | null | undefined
}

const initialState = {
    userLogin: settings.getStorageJson(USER_LOGIN)
        ? settings.getStorageJson(USER_LOGIN)
        : {}
}
const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserLoginAction: (state: UserState, action: PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload;
        }
    }
});

export const { setUserLoginAction } = userReducer.actions

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
            const action: PayloadAction<UserLoginResult> = setUserLoginAction(result.data.content);
            dispatch(action);
            settings.setStorageJson(USER_LOGIN, result.data.content);
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
                onClose: () => window.location.href = "/"
            });
            settings.setStorageJson(USER_LOGIN, result.data.content);
        }
    };
};