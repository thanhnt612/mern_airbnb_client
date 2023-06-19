import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { updateProfileApi } from '../../redux/reducers/userReducer';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBookingApi, getBookingProfileApi } from '../../redux/reducers/bookingReducer';

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
    const [image, setImage] = useState<File | null>(null);
    if (Object.keys(userLogin).length === 0) {
        window.location.href = "/user/login";
    }

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        setImage(event.target.files[0]);
    }

    useEffect(() => {
        dispatch(getBookingApi())
        dispatch(getBookingProfileApi(userLogin.id))
    }, []);
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
        <div className='profile-page pt-3'>
            <div className="container">
                <div className="row">
                    <div className="info col-md-12 col-lg-3">
                        <div className="account bg-light border rounded p-4">
                            <div className="avatar text-center">
                                <img src={image === null ? "http://picsum.photos/200/200" : URL.createObjectURL(image)} alt="preview"
                                    className='rounded-circle' />
                                <div className="update-avatar bg-white pt-3">
                                    <button className='border-0 text-decoration-underline'
                                        data-bs-toggle="modal"
                                        data-bs-target="#addAvatar">Edit</button>
                                    <div className="modal fade " id="addAvatar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update avatar</h1>
                                                </div>
                                                <div className="modal-body">
                                                    <input type="file" onChange={onImageChange} className="filetype" />
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn bg-danger text-light" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='verify pt-2'>
                                <div className="identity">
                                    <h5>Identity verification <i className="fa-regular fa-square-check"></i></h5>
                                    <p>Verify your identity with identity verification badge</p>
                                </div>
                                <div className="button">
                                    <button className='btn'>Get a badge</button>
                                </div>
                                <hr />
                                <div className='check-profile'>
                                    <p className='fw-bold'>Confirmed account</p>
                                    <div className="confirm">
                                        <i className='fa fa-check'></i><span className='ps-2'>Email</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="history col-md-12 col-lg-9 mb-3">
                        <div className="title pt-3">
                            <h3>Hello, I'm {userLogin.name}</h3>
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
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Information</h1>
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
                            <NavLink className='text-decoration-none border-0 p-2 me-2 bg-primary text-white rounded' to="/new">
                                <i className="bi bi-plus-lg"></i> Add New Place
                            </NavLink>
                            <NavLink className='text-decoration-none border-0 p-2 bg-primary text-white rounded' to="/list-rent">
                                <i className="bi bi-house-add"></i> Your apartment for rent
                            </NavLink>
                        </div>
                        <div className='list-title'>
                            <h4>Your booking</h4>
                        </div>
                        {arrHistory.map((item: any, index: number) => {
                            return <div key={index}>
                                {arrBooking.map((prod: any, index: number) => {
                                    if (item.placeId === prod._id) {
                                        return <div className="list-choose d-flex py-3 bg-light border border-2 border-success 
                                        border-opacity-25 rounded mb-4" key={index}>
                                            <div className="thumbnail col-4 p-4">
                                                <img src={'http://localhost:8080/uploads/' + prod.photos[0]}
                                                    className='w-100 rounded' alt="" />
                                            </div>
                                            <div className="detail col-8 p-2">
                                                <div className="info">
                                                    <h5>{prod.address}</h5>
                                                    <p className='fw-bold'>{prod.title}</p>
                                                    <p>
                                                        Guest: <span className='fw-bold'>{item.numberOfGuest}</span>
                                                    </p>
                                                </div>
                                                <div className="time">
                                                    <p>Check In: <span className='fw-bold'> {(new Date(item.checkIn)).toLocaleDateString()}</span></p>
                                                    <p>Check Out: <span className='fw-bold'> {(new Date(item.checkOut)).toLocaleDateString()}</span></p>
                                                </div>
                                                <div>
                                                    <p>Total: <span className='fw-bold'>${item.price}</span></p>
                                                </div>
                                                <div className="view-more">
                                                    <div className="button">
                                                        <NavLink to={`/detail/${prod._id}`} className="btn">
                                                            <span>
                                                                View Room Details
                                                            </span>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })
                                }
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}