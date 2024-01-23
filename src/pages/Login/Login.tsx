import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { loginApi } from '../../redux/reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingIcon } from '../../Components/Icon';
import { UserContext } from '../User/UserContext';


export type UserLogin = {
  email: string,
  password: string
}

export default function Login() {
  const dispatch: DispatchType = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const { userInfo }: any = useContext(UserContext);

  const frm: FormikProps<UserLogin> = useFormik<UserLogin>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid email !!!")
        .required("Required"),
      password: yup
        .string()
        .required("Required"),
    }),
    onSubmit: (values: UserLogin) => {
      dispatch(loginApi(values))
    }
  });
  const togglePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }
  const handleLogin = () => {
    if (!userInfo) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000)
    } else {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className='login-page'>
        <div className="main row pt-5">
          <div className="signin-content">
            <div className="signin-form">
              <div className='d-flex flex-column align-items-center'>
                <NavLink to="/">
                  <img src='../img/logo.png' className='d-block rounded border p-1 border-danger' width="120px" alt="" />
                </NavLink>
              </div>
              <h2 className="form-title text-center fw-bold">Log In</h2>
              <form className="login-form" onSubmit={frm.handleSubmit}>
                <div className="form-group d-flex flex-column align-items-center pb-2">
                  <p className='fw-bold w-50 mb-1'>Email</p>
                  <input className=
                    {
                      frm.errors.email && frm.touched.email
                        ? 'border border-danger p-3 rounded w-50'
                        : 'border border-dark p-3 rounded w-50'
                    }
                    name="email"
                    placeholder="Email"
                    onBlur={frm.handleBlur}
                    onChange={frm.handleChange} style={{ outline: 'none' }} />
                  {frm.errors.email && frm.touched.email &&
                    <p className="text text-danger">{frm.errors.email}</p>}
                </div>
                <div className="form-group d-flex flex-column align-items-center">
                  <p className='fw-bold w-50 mb-1'>Password</p>
                  <div className='position-relative w-50'>
                    <input className=
                      {
                        frm.errors.password && frm.touched.password
                          ? 'border border-danger p-3 rounded w-100'
                          : 'border border-dark p-3 rounded w-100'
                      }
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      onBlur={frm.handleBlur}
                      onChange={frm.handleChange} style={{ outline: 'none' }} />
                    <button
                      className='btn position-absolute end-0'
                      onClick={togglePassword}
                      style={{ border: 'none', top: "10px" }}>
                      {showPassword
                        ? <i className="bi bi-eye-fill"></i>
                        : <i className="bi bi-eye-slash-fill"></i>
                      }
                    </button>
                  </div>
                  {frm.errors.password && frm.touched.password &&
                    <p className="text text-danger">{frm.errors.password}</p>}
                </div>
                <div className="button d-flex flex-column align-items-center">
                  <button type="submit" className="btn-login fw-bold"
                    disabled={!(frm.isValid && frm.dirty)}
                    onClick={handleLogin}
                  >
                    {loading
                      ?
                      <div className='d-flex align-items-center'>
                        <LoadingIcon className={`loading-spinner text-light bg-transparent`} />
                      </div>
                      : <>
                        Log In
                      </>}
                  </button>
                  <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored" />
                  <NavLink to="/user/forgot-password" className='text-decoration-none pt-2'>Forgot Password</NavLink>
                  <div className='my-3 w-50 border-top border border-danger'>
                  </div>
                  {/* <div>
                    <button className='btn btn-light border-dark p-2 d-flex flex-row align-items-center'>
                      <img src="../../img/google.png" width="20px" height="20px" alt="" />
                      <span className='ms-1'>Login by Google</span>
                    </button>
                  </div> */}
                  <span className='pt-4'>Don't have an Account?</span>
                  <NavLink to='/user/register'>
                    Please register here <i className="bi bi-arrow-left-square-fill"></i>
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}