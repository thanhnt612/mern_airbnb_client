import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik, FormikProps } from 'formik';

import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { loginApi } from '../../redux/reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingIcon } from '../../Components/Icon';


export type UserLogin = {
  email: string,
  password: string
}

export default function Login() {
  const dispatch: DispatchType = useDispatch();
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <div className='login-page '>
        <div className="main row rounded">
          <div className="signin-content">
            <div className="signin-form">
              <div className='d-flex flex-column align-items-center'>
                <NavLink to="/">
                  <img src='../img/logonew2.jpg' className='d-block rounded border p-1 border-danger' width="120px" alt="" />
                </NavLink>
              </div>
              <h2 className="form-title text-center">Log In</h2>
              <form className="login-form" onSubmit={frm.handleSubmit}>
                <div className="form-group d-flex flex-column">
                  <p className='fw-bold mb-1'>Email</p>
                  <input className=
                    {
                      frm.errors.email && frm.touched.email
                        ? 'border border-danger p-2 rounded'
                        : 'border border-dark p-2 rounded'
                    }
                    name="email"
                    placeholder="Email"
                    onBlur={frm.handleBlur}
                    onChange={frm.handleChange} style={{ outline: 'none' }} />
                  {frm.errors.email && frm.touched.email &&
                    <p className="text text-danger">{frm.errors.email}</p>}
                </div>
                <div className="form-group d-flex flex-column ">
                  <p className='fw-bold mb-1'>Password</p>
                  <div className='position-relative'>
                    <input className=
                      {
                        frm.errors.password && frm.touched.password
                          ? 'border border-danger p-2 rounded'
                          : 'border border-dark p-2 rounded'
                      }
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      onBlur={frm.handleBlur}
                      onChange={frm.handleChange} style={{ outline: 'none' }} />
                    <button
                      className='btn position-absolute top-0 end-0'
                      onClick={togglePassword}
                      style={{ border: 'none' }}>
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
                  <button type="submit" className="btn-login"
                    onClick={() => {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                      }, 2000);
                    }}>
                    Log In
                  </button>
                  {loading ? <LoadingIcon className={`text-center`} /> : null}

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