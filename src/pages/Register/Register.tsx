import React from 'react'
import { FormikProps, useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DispatchType } from '../../redux/configStore'
import { registerApi } from '../../redux/reducers/userReducer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export type UserRegister = {
  email: string,
  password: string,
  name: string,
}
export default function Register() {
  const dispatch: DispatchType = useDispatch();
  const frm: FormikProps<UserRegister> = useFormik<UserRegister>({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email Address !!!")
        .required("Please enter your email !!!"),
      password: yup.string().required("Please enter your password !!!"),
      name: yup.string().required("Please enter your name !!!"),
    }),
    onSubmit: (values: UserRegister) => {
      dispatch(registerApi(values))
    }
  });
  return (
    <div className='register-page '>
      <div className="container">
        <div className="row rounded">
          <div className="signup-content">
            <div className="signup-form">
              <NavLink to="/">
                <img src='../img/logo.png' className='d-block' width="102px" height='32px' alt="" />
              </NavLink>
              <h2 className="form-title">Sign up</h2>
              <form className="register-form" onSubmit={frm.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email"><i className="fa-regular fa-envelope"></i></label>
                  <input type="email" name="email" id="email" placeholder="Your Email"
                    onChange={frm.handleChange} onBlur={frm.handleBlur}
                  />
                </div>
                {frm.errors.email ? (
                  <p className="text text-danger">{frm.errors.email}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="pass"><i className="fa-solid fa-lock"></i></label>
                  <input type="password" name="password" id="password" placeholder="Password"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.password ? (
                  <p className="text text-danger">{frm.errors.password}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="name"><i className="fa-regular fa-user"></i></label>
                  <input type="text" name="name" id="name" placeholder="Your Name"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.name ? (
                  <p className="text text-danger">{frm.errors.name}</p>
                ) : (
                  ""
                )}
                <div className="button">
                  <button type="submit" className="btn-register">Sign Up</button> <br />
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
                  <span>Do you already have an account?</span> <br />
                  <NavLink to='/user/login'>
                    Please login here<i className="bi bi-arrow-left-square-fill"></i>
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