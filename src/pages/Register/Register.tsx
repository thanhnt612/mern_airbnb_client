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
      <div className="main row rounded">
        <div className="signup-content">
          <div className="signup-form">
            <div className='d-flex flex-column align-items-center'>
              <NavLink to="/">
                <img src='../img/logonew2.jpg' className='d-block rounded border p-1 border-danger' width="120px" alt="" />
              </NavLink>
            </div>
            <h2 className="form-title text-center">Sign up</h2>
            <form className="register-form" onSubmit={frm.handleSubmit} autoComplete='off'>
              <div className="form-group d-flex flex-column">
                <p className='fw-bold mb-1'>Email</p>
                <input className=
                  {
                    frm.errors.email && frm.touched.email
                      ? 'border border-danger p-2 rounded'
                      : 'border border-dark p-2 rounded'
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
              <div className="form-group d-flex flex-column">
                <p className='fw-bold mb-1'>Password</p>
                <div className='position-relative'>
                  <input className=
                    {
                      frm.errors.password && frm.touched.password
                        ? 'border border-danger p-2 rounded'
                        : 'border border-dark p-2 rounded'
                    }
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={frm.values.password}
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur} />
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
              <div className="form-group d-flex flex-column">
                <p className='fw-bold mb-1'>Confirm Password</p>
                <div className='position-relative'>
                  <input className=
                    {
                      frm.errors.confirmPassword && frm.touched.confirmPassword
                        ? 'border border-danger p-2 rounded'
                        : 'border border-dark p-2 rounded'
                    }
                    type={showPasswordConfirm ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur} />
                  <button
                    className='btn position-absolute top-0 end-0'
                    onClick={togglePasswordConfirm}
                    style={{ border: 'none' }}>
                    {showPasswordConfirm
                      ? <i className="bi bi-eye-fill"></i>
                      : <i className="bi bi-eye-slash-fill"></i>
                    }
                  </button>
                </div>
                {frm.errors.confirmPassword && frm.touched.confirmPassword &&
                  <p className="text text-danger">{frm.errors.confirmPassword}</p>}
              </div>
              <div className="form-group d-flex flex-column">
                <p className='fw-bold mb-1'>Name</p>
                <input className=
                  {
                    frm.errors.name && frm.touched.name
                      ? 'border border-danger p-2 rounded'
                      : 'border border-dark p-2 rounded'
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
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 2000);
                  }}>
                  Sign Up
                </button>
                {loading ? <LoadingIcon className={`text-center`} /> : null}
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