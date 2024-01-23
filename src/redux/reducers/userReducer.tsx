import { UserLogin } from '../../pages/Login/Login';
import { UserRegister } from '../../pages/Register/Register';
import { http } from "../../utils/config";
import { DispatchType } from '../configStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type EditProfile = {
    name: string,
}
export interface UserModel {
    id: string,
    email: string,
    name: string,
    isAdmin: boolean,
    verify: boolean,
    avatar: string
}

export interface ProfileModel {
    _id: string,
    email: string,
    name: string,
    avatar: string,
}

interface UserState {
    arrUser: UserModel[],
    arrProfile: ProfileModel | null
}

const initialState: UserState = {
    arrUser: [],
    arrProfile: null
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setArrUserList:
            (state: UserState, action: PayloadAction<UserModel[]>) => {
                const arrUserList: UserModel[] = action.payload;
                state.arrUser = arrUserList;
            },
        setProfileUser:
            (state: UserState, action: PayloadAction<ProfileModel>) => {
                const profileUser: ProfileModel = action.payload;
                state.arrProfile = profileUser;
            },

    }
})
export const {
    setArrUserList,
    setProfileUser
} = userReducer.actions
export default userReducer.reducer
export const registerApi = (register: UserRegister) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/register', register);
        if (result.data.status === 200) {
            toast.success(result.data.message, {
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
        if (result.data.status === 400) {
            toast.error(result.data.message, {
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
    };
};

export const loginApi = (userLogin: UserLogin) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/login', userLogin
            , {
                withCredentials: true,
            }
        );
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
                onClose: () => window.location.href = "/"
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
    }
}
export const logoutApi = () => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/logout');
        window.location.href = "/user/login";
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

export const getListUser = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/dashboard/user');
        let arrUser: UserModel[] = result.data.content;
        const action: PayloadAction<UserModel[]> = setArrUserList(arrUser);
        dispatch(action)
    }
}

export const deleteUser = (id: string) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.delete('/user/delete/' + id);
        if (result.data.status === 200) {
            alert(result.data.message)
            window.location.href = "/dashboard"
        }
    }
}

export const verifyAccount = (id: string, user: object) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.post('/user/verify/' + id, { user })
        if (result.data.status === 200) {
            alert(result.data.message)
            window.location.href = "/dashboard"
        }
    }
}

export const forgotPassword = (email: string) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.post('/user/forgot-password/', { email })
        if (result.data.status === 200) {
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return true
        }
        if (result.data.status === 401) {
            toast.error(result.data.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return false
        }
    }
}

export const resetPassword = (token: string, password: string) => {
    return async (dispatch: DispatchType) => {
        console.log(token, password);
        const result: any = await http.post('/user/reset-password/', { token, password })
        if (result.data.status === 200) {
            toast.success(result.data.message, {
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