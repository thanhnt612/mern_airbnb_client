import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { NavLink } from 'react-router-dom';
import { forgotPassword } from '../../redux/reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configStorage } from '../../utils/config';

export default function ForgotPassword() {
  const dispatch: DispatchType = useDispatch();
  const initialValues = {
    email: ""
  };
  const [information, setInformation] = useState(initialValues);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation({
      ...information,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const isDone: any = await dispatch(forgotPassword(information.email))
    setIsSuccess(isDone)
    configStorage.setStorageJson('reset', false)
  }
  return (
    <div>
      <div className="login-page">
        <div className="main row pt-5">
          <div className="signin-content">
            <div className="signin-form">
              <div className="d-flex flex-column align-items-center">
                <NavLink to="/">
                  <img
                    src="../img/logo.png"
                    className="d-block rounded border p-1 border-danger"
                    width="120px"
                    alt=""
                  />
                </NavLink>
              </div>
              <h2 className="form-title text-center fw-bold">Forgot Password</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group d-flex flex-column align-items-center pb-2">
                  {!isSuccess && (
                    <>
                      <p className="fw-bold w-50 pt-4 mb-1">Email</p>
                      <input
                        className="border border-dark p-3 rounded w-50"
                        name="email"
                        placeholder="example@email.com"
                        type="text"
                        value={information.email}
                        onChange={handleOnChange}
                      />
                      <br />
                      <button className='btn btn-danger w-50' type='submit'>
                        Send
                      </button>
                      <div className='py-3'>
                        <p>
                          Remembered suddenly?
                          <NavLink className="text-danger text-decoration-none"
                            to="/user/login"> Login Now
                          </NavLink>
                        </p>
                      </div>
                    </>)}
                  {isSuccess && (
                    <>
                      <h5>Reset instruction sent successfully</h5>
                    </>)}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
