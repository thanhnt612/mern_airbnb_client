import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { updateProfileApi } from '../../redux/reducers/userReducer';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
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
  const [loading, setLoading] = useState(false)

  if (Object.keys(userLogin).length === 0) {
    window.location.href = "/user/login";
  }

  useEffect(() => {
    dispatch(getBookingApi())
    dispatch(getBookingProfileApi(userLogin._id))
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
    onSubmit: (values: EditProfile) => {
      dispatch(updateProfileApi(userLogin._id, values))
    }
  });
  return (
    <div className='profile-page-mobile pt-3'>
      <div className="container">
        <div className="row">
          <div className="history d-flex flex-column col-12 mb-3 pt-3">
            <div className="title">
              <h3>Hello, I'm {userLogin.name}</h3>
              <p>Joined 2023</p>
            </div>
            <div className="edit-profile mb-3">
              <button className='border-0 p-2 me-2 bg-primary text-white rounded'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              > Edit Profile</button>
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Information</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
                          <label htmlFor="name">Tên:</label>
                          <input type="name" name="name" id="name"
                            value={frm.values.name}
                            className="form-control"
                            onChange={frm.handleChange}
                            onBlur={frm.handleBlur}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn border-dark " data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn border-dark">Update</button>
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
            <div className='mb-3'>
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
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {arrHistory.map((item: any, index: number) => {
                  return <div key={index}>
                    {arrBooking.map((prod: any, index: number) => {
                      if (item.placeId === prod._id) {
                        return <div className="list-choose d-flex flex-wrap p-3 bg-light border border-2 border-success 
                                        border-opacity-25 rounded mb-4" key={index}>
                          <div className="thumbnail col-12 col-md-4 p-2">
                            <img src={prod.photos[0]}
                              className='w-100 h-100 rounded' alt="" />
                          </div>
                          <div className="detail col-12 col-md-8 p-2">
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
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  )
}