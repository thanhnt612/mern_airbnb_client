import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik, FormikProps } from 'formik';

import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { loginApi } from '../../redux/reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  return (
    <div>
      <div className='login-page '>
        <div className="main row rounded">
          <div className="signin-content">
            <div className="signin-form">
              <div className='d-flex flex-column align-items-center'>
                <NavLink to="/">
                  <img src='../img/logonew2.jpg' className='d-block rounded border p-1 border-danger' width="120px"  alt="" />
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
                    onChange={frm.handleChange} />
                  {frm.errors.email && frm.touched.email &&
                    <p className="text text-danger">{frm.errors.email}</p>}
                </div>
                <div className="form-group d-flex flex-column ">
                  <p className='fw-bold mb-1'>Password</p>
                  <input className=
                    {
                      frm.errors.password && frm.touched.password
                        ? 'border border-danger p-2 rounded'
                        : 'border border-dark p-2 rounded'
                    }
                    name="password"
                    type="password"
                    placeholder="Password"
                    onBlur={frm.handleBlur}
                    onChange={frm.handleChange} />
                  {frm.errors.password && frm.touched.password &&
                    <p className="text text-danger">{frm.errors.password}</p>}
                </div>
                <div className="button d-flex flex-column align-items-center">
                  <button type="submit" className="btn-register"
                  >Log In</button>
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