import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLogin } from '../../pages/Login/Login';
import { UserRegister } from '../../pages/Register/Register';
import {
    ACCESS_TOKEN,
    configStorage,
    http,
} from "../../utils/config";
import { DispatchType } from '../configStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../index';

export type EditProfile = {
    name: string,
}

export type Token = {
    token: string,
}

export type StateManage = {
    token?: Token
}

const initialState = {
    token: configStorage.getStorageJson(ACCESS_TOKEN)
        ? configStorage.getStorageJson(ACCESS_TOKEN)
        : {},
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setTokenAction: (state: StateManage, action: PayloadAction<Token>) => {
            const arrToken: Token = action.payload;
            state.token = arrToken;
        },
    }
});

export const { setTokenAction } = userReducer.actions

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
        const result = await http.post('/user/login', userLogin
            , {
                withCredentials: true,
            }
        );
        console.log(result.status);
        // http.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;
        if (result.status === 200) {
            toast.success('Login Successfully !!!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/"
            });
        }
        if (result.status === 401) {
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
        if (result.status === 402) {
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
        configStorage.setCookieJson(ACCESS_TOKEN, result.data, 1)
    }
}
export const logoutApi = () => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/logout');
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
        }
    };
};
