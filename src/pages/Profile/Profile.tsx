import { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { getBookingProfileApi } from '../../redux/reducers/bookingReducer';
import AvatarUpload from './AvatarUpload';
import { UserContext } from '../User/UserContext';

export default function Profile() {
    const dispatch: DispatchType = useDispatch();
    const { userInfo }: any = useContext(UserContext);
    const [addPhoto, setAddPhoto] = useState<null | any>([])
    const { arrHistory } = useSelector((state: RootState) => state.bookingReducer);

    useEffect(() => {
        dispatch(getBookingProfileApi(userInfo?._id))
    }, [userInfo?._id]);

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
                <>
                    <div className='border border-danger border-4 border-bottom my-5'></div>
                    <div className='list-title text-center'>
                        <h4>Booking</h4>
                    </div>
                    <div className='d-flex flex-row flex-wrap'>
                        {arrHistory.map((item: any, index: number) => {
                            //Current Date
                            let dateCurrent = new Date().toISOString()
                            //Checkout Date
                            let checkOutBooking = item.checkOut;
                            if (dateCurrent < checkOutBooking) {
                                return <div className='col-12 col-md-6 col-lg-4 p-2' key={index}>
                                    <div className="list-choose p-0 rounded mb-4 position-relative" key={index}>
                                        <div className="thumbnail">
                                            <img src={item.placeId.photos[0]}
                                                className='w-100 rounded' alt="" />
                                        </div>
                                        <div className="detail d-flex flex-column justify-content-center p-3 position-absolute bottom-0 text-light">
                                            <div className="info">
                                                <h5 className=''>📌{item.placeId.address}</h5>
                                                <p className="mb-2 fw-bold">🔔{item.placeId.title}</p>
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
                                </div>;
                            } else {
                                // console.log(item._id);
                                // dispatch(changeStatusRoom(item._id))
                                //Check out is outdate =>>> ACTION change stautus available:true
                            }
                        })}
                    </div>
                    <div className='border border-danger border-4 border-bottom my-5'></div>
                    <div className='list-title text-center'>
                        <h4>History</h4>
                    </div>
                    <div className='d-flex flex-row flex-wrap'>
                        {arrHistory.map((item: any, index: number) => {
                            //Current Date
                            const dateCurrent = new Date().toISOString()
                            //Checkout Date
                            const checkOutBooking = item.checkOut;
                            if (dateCurrent > checkOutBooking) {
                                return <div className='col-12 col-md-6 col-lg-4 p-2' key={index}>
                                    <div className="list-choose p-0 rounded mb-4 position-relative" key={index}>
                                        <div className="thumbnail">
                                            <img src={item.placeId.photos[0]}
                                                className='w-100 rounded' alt="" />
                                        </div>
                                        <div className="detail d-flex flex-column justify-content-center p-3 position-absolute bottom-0 text-light">
                                            <div className="info">
                                                <h5 className=''>📌{item.placeId.address}</h5>
                                                <p className="mb-2 fw-bold">🔔{item.placeId.title}</p>
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
                                </div>
                            }
                        })}
                    </div>
                </>
            )
        }
    }

    return (
        <div className='profile-page container'>
            <div className="profile-info">
                <div className="edit-profile mb-3 d-flex">
                    <div className="col-6 col-md-4 col-lg-3 p-3">
                        <div className="avatar text-center">
                            <div className="update-avatar pt-3">
                                <AvatarUpload addPhoto={addPhoto} url={userInfo?.avatar} onChange={setAddPhoto} profile={userInfo?._id} />
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-8 col-lg-9 p-3">
                        <div className="title m-0 me-2">
                            <h3>{userInfo?.name}</h3>
                        </div>
                        <div className="d-flex flex-column flex-md-row">
                            <div className='mb-2 me-2'>
                                <NavLink className='rounded btn btn-secondary' to="/edit">
                                    <i className="bi bi-gear-wide"></i> Edit Profile
                                </NavLink>
                            </div>
                            <div className="dropdown mb-2 me-2">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-house-gear-fill"></i> Place
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className="dropdown-item" to="/place/new">
                                            <i className="bi bi-plus-square"></i> New Place
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/place/list-rent">
                                            <i className="bi bi-house-add"></i> My Place
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-journal-text"></i> Blog
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink className="dropdown-item" to="/blog/new">
                                            <i className="bi bi-journal-plus"></i> New Blog
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/blog/list-blog">
                                            <i className="bi bi-journal-text"></i> My Blog
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="booking-info">
                <>
                    {renderHistoryBooking()}
                </>
            </div>
        </div>
    )
}