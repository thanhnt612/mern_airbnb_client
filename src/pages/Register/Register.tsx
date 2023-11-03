import React, { useState } from 'react'
import { FormikProps, useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DispatchType } from '../../redux/configStore'
import { registerApi } from '../../redux/reducers/userReducer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LoadingIcon } from '../../Components/Icon';

export type UserRegister = {
  email: string,
  password: string,
  name: string,
  confirmPassword: string
}
export default function Register() {
  const dispatch: DispatchType = useDispatch();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

  const frm: FormikProps<UserRegister> = useFormik<UserRegister>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid email !!!")
        .required("Required"),
      password: yup
        .string()
        .min(5)
        .matches(passwordRegex, { message: "Password must be min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit" })
        .required("Required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      name: yup
        .string()
        .required("Please enter your name !!!"),
    }),
    onSubmit: (values: UserRegister) => {
      dispatch(registerApi(values))
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const togglePasswordConfirm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPasswordConfirm(!showPasswordConfirm)
  }
  const [loading, setLoading] = useState(false)

  return (
    <div className='register-page '>
      <div className="main row pt-5">
        <div className="signup-content">
          <div className="signup-form">
            <div className='d-flex flex-column align-items-center'>
              <NavLink to="/">
                <img src='../img/logo.png' className='d-block rounded border p-1 border-danger' width="120px" alt="" />
              </NavLink>
            </div>
            <h2 className="form-title text-center">Sign up</h2>
            <form className="register-form" onSubmit={frm.handleSubmit} autoComplete='off'>
              <div className="form-group d-flex flex-column align-items-center">
                <p className='fw-bold mb-1 w-50'>Email</p>
                <input className=
                  {
                    frm.errors.email && frm.touched.email
                      ? 'border border-danger p-3 rounded w-50'
                      : 'border border-dark p-3 rounded w-50'
                  }
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  value={frm.values.email}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur}
                />
                {frm.errors.email && frm.touched.email &&
                  <p className="text text-danger">{frm.errors.email}</p>}
              </div>
              <div className="form-group d-flex flex-column align-items-center">
                <p className='fw-bold mb-1 w-50'>Password</p>
                <div className='position-relative w-50'>
                  <input className=
                    {
                      frm.errors.password && frm.touched.password
                        ? 'border border-danger p-3 rounded w-100'
                        : 'border border-dark p-3 rounded w-100'
                    }
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={frm.values.password}
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur} />
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
              <div className="form-group d-flex flex-column align-items-center">
                <p className='fw-bold mb-1 w-50'>Confirm Password</p>
                <div className='position-relative w-50'>
                  <input className=
                    {
                      frm.errors.confirmPassword && frm.touched.confirmPassword
                        ? 'border border-danger p-3 rounded w-100'
                        : 'border border-dark p-3 rounded w-100'
                    }
                    type={showPasswordConfirm ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur} />
                  <button
                    className='btn position-absolute end-0'
                    onClick={togglePasswordConfirm}
                    style={{ border: 'none', top: "10px" }}>
                    {showPasswordConfirm
                      ? <i className="bi bi-eye-fill"></i>
                      : <i className="bi bi-eye-slash-fill"></i>
                    }
                  </button>
                </div>
                {frm.errors.confirmPassword && frm.touched.confirmPassword &&
                  <p className="text text-danger">{frm.errors.confirmPassword}</p>}
              </div>
              <div className="form-group d-flex flex-column align-items-center">
                <p className='fw-bold mb-1 w-50'>Name</p>
                <input className=
                  {
                    frm.errors.name && frm.touched.name
                      ? 'border border-danger p-3 rounded w-50'
                      : 'border border-dark p-3 rounded w-50'
                  }
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={frm.values.name}
                  onChange={frm.handleChange}
                  onBlur={frm.handleBlur} />
                {frm.errors.name && frm.touched.name &&
                  <p className="text text-danger">{frm.errors.name}</p>}
              </div>
              <div className="button d-flex flex-column align-items-center">
                <button type="submit" className="btn-register"
                  disabled={!(frm.isValid && frm.dirty)}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 3000)
                  }}>
                  {loading
                    ?
                    <div className='d-flex align-items-center'>
                      <LoadingIcon className={`loading-spinner text-light bg-transparent`} />
                    </div>
                    : <>
                      Sign Up
                    </>}
                </button>
                <br />
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
  )
}