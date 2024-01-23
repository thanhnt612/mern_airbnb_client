import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { DispatchType } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/reducers/userReducer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configStorage } from "../../utils/config";


export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const dispatch: DispatchType = useDispatch();
  const initialValues = {
    password: ""
  };
  const [information, setInformation] = useState(initialValues);
  const [resetToken, setResetToken] = useState("");
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation({
      ...information,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword(resetToken, information.password))
    setIsResetSuccess(true);
    configStorage.setStorageJson('reset', true)
  }
  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("resetToken");
      if (token) {
        setResetToken(token);
      }
    };
    verify();
  }, [searchParams])
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
              <h2 className="form-title text-center fw-bold">Reset Password</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group d-flex flex-column align-items-center pb-2">
                  {!isResetSuccess && (
                    <>
                      <p className="fw-bold w-50 pt-4 mb-1">Password</p>
                      <input
                        className="border border-dark p-3 rounded w-50"
                        name="password"
                        placeholder="Please fill a form. . . ."
                        type="text"
                        value={information.password}
                        onChange={handleOnChange}
                      />
                      <br />
                      <button className='btn btn-danger w-50' type="submit">
                        Reset
                      </button>
                    </>
                  )}
                  {isResetSuccess && (
                    <p>
                      Reset successfully <NavLink className="text-danger text-decoration-none"
                        to="/user/login">Login</NavLink>
                    </p>
                  )}
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
