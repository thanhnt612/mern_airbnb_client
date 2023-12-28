import { UserLogin } from '../../pages/Login/Login';
import { UserRegister } from '../../pages/Register/Register';
import { ACCESS_TOKEN, configStorage, http } from "../../utils/config";
import { DispatchType } from '../configStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../index';

export type EditProfile = {
    name: string,
}

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
        configStorage.setCookieJson(ACCESS_TOKEN, result.data.accessToken, 1)
        configStorage.setStorageJson('status', true)
    }
}
export const logoutApi = () => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/user/logout');
        configStorage.setStorageJson('status', false)
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
