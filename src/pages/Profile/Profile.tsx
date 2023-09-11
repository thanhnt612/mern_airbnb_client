import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { updateProfileApi } from '../../redux/reducers/userReducer';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBookingApi, getBookingProfileApi } from '../../redux/reducers/bookingReducer';
import { LoadingPage } from '../../Components/Icon';

export type EditProfile = {
    email: string,
    name: string,
    password: string
}

export default function Profile() {
    const dispatch: DispatchType = useDispatch();
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const { arrBooking } = useSelector((state: RootState) => state.bookingReducer);
    const { arrHistory } = useSelector((state: RootState) => state.bookingReducer);
    const [loading, setLoading] = useState(false)

    if (Object.keys(userLogin).length === 0) {
        window.location.href = "/user/login";
    }
    useEffect(() => {
        dispatch(getBookingApi())
        dispatch(getBookingProfileApi(userLogin._id))
        if (arrHistory.length === 0) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        } else {
            setLoading(false);
        }
    }, [arrHistory.length]);
    const renderHistoryBooking = () => {
        if (arrHistory.length === 0) {
            return (
                <div className='text-center notification border border-dark border-2 py-3 rounded'>
                    <h4>
                        We haven't received confirmation of place booking yet
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 btn btn-danger rounded me-2" to="/">Back to Home</NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='d-flex flex-row flex-wrap'>
                    {arrHistory.map((item: any, index: number) => {
                        return <div className='col-12 p-2' key={index}>
                            {arrBooking.map((prod: any, index: number) => {
                                if (item.placeId === prod._id) {
                                    return <div className="list-choose d-flex border border-2 border-success 
                        border-opacity-25 rounded mb-4" key={index} style={{ height: '310px' }}>
                                        <div className="thumbnail col-8 p-3">
                                            <img src={prod.photos[0]}
                                                className='w-100 h-100 rounded' alt="" />
                                        </div>
                                        <div className="detail d-flex flex-column justify-content-center col-4 p-3">
                                            <div className="info">
                                                <h5>📌{prod.address}</h5>
                                                <p className="mb-2 text-truncate fw-bold">🔔{prod.title}</p>
                                                <p className="mb-2">
                                                    Guest: <span className='fw-bold'>{item.numberOfGuest}</span>
                                                </p>
                                            </div>
                                            <div className="time">
                                                <p className="mb-2">Check In: <span className='fw-bold'> {(new Date(item.checkIn)).toLocaleDateString()}</span></p>
                                                <p className="mb-2">Check Out: <span className='fw-bold'> {(new Date(item.checkOut)).toLocaleDateString()}</span></p>
                                            </div>
                                            <div>
                                                <p className="mb-2">Total: <span className='fw-bold'>💲{item.price}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            })
                            }
                        </div>
                    })}
                </div>
            )
        }
    }
    const frm: FormikProps<EditProfile> = useFormik<EditProfile>({
        initialValues: {
            email: userLogin.email,
            name: userLogin.name,
            password: userLogin.password
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Please enter your name !!!"),
        }),
        onSubmit: async (values: EditProfile) => {
            dispatch(updateProfileApi(userLogin._id, values))
        }
    });
    return (
        <div className='profile-page'>
            <div className="container">
                <div className="row">
                    <div className="history mb-3">
                        <div className="title pt-3">
                            <h3>Hello {userLogin.name} ✨</h3>
                            <p>Joined 2023</p>
                        </div>
                        <div className="edit-profile mb-3">
                            <button className='border-0 p-2 me-2 bg-primary text-white rounded'
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            ><i className="bi bi-person-circle"></i> Edit Profile</button>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Edit Information</h1>
                                            <button type="button" className="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <form onSubmit={frm.handleSubmit}>
                                            <div className="modal-body">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" name="email" id="email"
                                                        className="form-control"
                                                        value={frm.values.email}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="password">Password:</label>
                                                    <input type="password" name="password" id="password"
                                                        className="form-control"
                                                        value={frm.values.password}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Name:</label>
                                                    <input type="name" name="name" id="name"
                                                        value={frm.values.name}
                                                        className="form-control"
                                                        onChange={frm.handleChange}
                                                        onBlur={frm.handleBlur}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn bg-danger text-white" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn bg-primary text-white">Update</button>
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
                            <NavLink className='text-decoration-none border-0 p-2 me-2 bg-danger text-white rounded' to="/place/new">
                                <i className="bi bi-plus-lg"></i> Add New Place
                            </NavLink>
                            <NavLink className='text-decoration-none border-0 p-2 bg-danger text-white rounded' to="/place/list-rent">
                                <i className="bi bi-house-add"></i> Your apartment for rent
                            </NavLink>
                        </div>
                        <div className='list-title'>
                            <h4>Your booking</h4>
                        </div>
                        {loading ? (
                            <LoadingPage className={`loading-spinner bg-transparent mt-5`}
                                width="70px" height='70px' />
                        ) : (
                            <>
                                {renderHistoryBooking()}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}