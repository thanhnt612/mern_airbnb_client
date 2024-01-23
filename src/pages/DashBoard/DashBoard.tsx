import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../pages/User/UserContext";
import { getListUser, logoutApi } from '../../redux/reducers/userReducer';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogApi, getBookingApi, getBookingListToDashboard } from '../../redux/reducers/bookingReducer';
import PlaceData from './PlaceData';
import UserData from './UserData';
import BookingData from './BookingData';
import BlogData from './BlogData';


export default function DashBoard() {
  const dispatch: DispatchType = useDispatch();
  const { userInfo }: any = useContext(UserContext);
  const imageBasePath = window.location.protocol + "//" + window.location.host + "/img/logo.png";
  const { arrUser } = useSelector((state: RootState) => state.userReducer);
  const { arrPlace } = useSelector((state: RootState) => state.bookingReducer);
  const { arrBookingDashboard } = useSelector((state: RootState) => state.bookingReducer);
  const { arrBlog } = useSelector((state: RootState) => state.bookingReducer);

  useEffect(() => {
    dispatch(getListUser())
    dispatch(getBookingApi())
    dispatch(getBookingListToDashboard())
    dispatch(getBlogApi())
  }, [userInfo])

  return (
    <>
      <header className='d-flex p-3 justify-content-between bg-dark'>
        <div className="header-home">
          <NavLink to="/">
            <img
              src={imageBasePath}
              className="rounded-3 m-1 bg-white"
              width="100px"
              alt=""
            />
          </NavLink>
        </div>
        <li className="p-2 dropdown bg-light rounded-3 d-flex align-items-center" style={{ listStyle: "none" }}>
          <NavLink
            className="nav-link"
            to=""
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {userInfo
              ? <>
                <p className="text-dark border-dark m-0">
                  {userInfo.name}
                </p>
              </>
              : <>
                <span className="text-dark">
                  <i className="bar fa-solid fa-bars"></i>&nbsp;
                  <i className="user fa-solid fa-user"></i>
                </span>
              </>
            }
          </NavLink>
          <ul className="dropdown-menu list-info">
            {userInfo?.name
              ?
              <>
                <li>
                  <a className="dropdown-item" href="/profile">
                    <i className="bi bi-person-check"></i> Profile: {userInfo.name}
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      dispatch(logoutApi())
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-box-arrow-left"></i> Log Out
                  </a>
                </li>
              </>
              :
              <>
                <li>
                  <NavLink className="dropdown-item" to="/user/register">
                    <i className="bi bi-person-fill-add"></i> Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/user/login">
                    <i className="bi bi-person-fill-up"></i> Log In
                  </NavLink>
                </li>
              </>
            }
          </ul>
        </li>
      </header>
      <div className="d-flex align-items-start">
        <div className="col-2 col-lg-1 nav flex-column nav-pills bg-secondary " id="v-pills-tab"
          style={{ height: "880px" }}>
          <button className="nav-link text-light active" data-bs-toggle="pill" data-bs-target="#v-user">User</button>
          <button className="nav-link text-light" data-bs-toggle="pill" data-bs-target="#v-place">Place</button>
          <button className="nav-link text-light" data-bs-toggle="pill" data-bs-target="#v-booking">Booking</button>
          <button className="nav-link text-light" data-bs-toggle="pill" data-bs-target="#v-blog">Blog</button>
        </div>
        <div className="col-10 col-lg-11 tab-content">
          <div className="tab-pane fade show active" id="v-user">
            <UserData data={arrUser} PageSize={11} />
          </div>
          <div className="tab-pane fade" id="v-place">
            <PlaceData data={arrPlace} PageSize={11} />
          </div>
          <div className="tab-pane fade" id="v-booking">
            <BookingData data={arrBookingDashboard} PageSize={11} />
          </div>
          <div className="tab-pane fade" id="v-blog">
            <BlogData data={arrBlog} PageSize={11} />
          </div>
        </div>
      </div>
    </>
  )
}
