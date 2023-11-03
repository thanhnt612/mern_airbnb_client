import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import {  updateProfileApi } from '../../redux/reducers/userReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  getBookingProfileApi } from '../../redux/reducers/bookingReducer';
import { UserContext } from '../User/UserContext';


export const Edit = () => {
    const dispatch: DispatchType = useDispatch();
    const { userInfo }: any = useContext(UserContext);

    const initialValues = {
        name: userInfo.name,
    };
    const [information, setInformation] = useState(initialValues);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInformation({
            ...information,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        dispatch(getBookingProfileApi(userInfo._id))
    }, [])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(updateProfileApi(userInfo._id, information))
    }
    return (
        <div>
            <div className="edit-information container d-flex justify-content-center">
                <div className='bg-light col-8 text-dark p-5 rounded-3'>
                    <div className="row w-100">
                        <div className="col-3 mb-3">
                            <div className="mx-auto" style={{ width: 140 }}>
                                <div className="d-flex justify-content-center align-items-center rounded" style={{ height: 140, backgroundColor: 'rgb(233, 236, 239)' }}>
                                    <span style={{ color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial' }}>140x140</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div className="">
                                <h4 className="">{userInfo.name}</h4>
                                <p className="">{userInfo.email}</p>
                            </div>
                            <div className="text-center text-sm-right">
                                <div className="text-muted"><small>Joined 09 Dec 2017</small></div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row py-4">
                            <p className='fw-bold'>Change Information</p>
                            <div className="col-6 mb-3">
                                <label>Name</label>
                                <div className='position-relative'>
                                    <input className="p-2 w-100 rounded-2 border-1"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={information.name}
                                        onChange={handleOnChange}
                                    />
                                    <button className="bg-danger text-light border-0 position-absolute top-0 end-0 rounded-end-2"
                                        style={{ padding: "9px" }}
                                        type="submit"
                                    >Change</button>
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
                            </div>
                        </div>
                    </form>
                    <div className="d-flex">
                        <div className='me-2'>
                            <button className='btn btn-secondary fw-bold'
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >Change Password
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel"
                                aria-hidden="true" style={{ display: 'none' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <form action="">
                                            <div className="modal-body">
                                                <div className="col-6 mb-3">
                                                    <label>Current Password</label>
                                                    <input className="rounded-3 border-1 border border-dark w-100 p-2" type="password" />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label>New Password</label>
                                                    <input className="rounded-3 border-1 border border-dark w-100 p-2" type="password" />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <label>Confirm Password</label>
                                                    <input className="rounded-3 border-1 border border-dark w-100 p-2" type="password" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="submit" className="btn btn-danger text-white">Save Change</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
