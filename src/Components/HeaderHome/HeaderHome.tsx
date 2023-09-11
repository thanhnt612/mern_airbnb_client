import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { USER_LOGIN } from '../../utils/config';
import { getBookingLocationApi } from '../../redux/reducers/bookingReducer';
import { history } from "../../index";
import useThemeSwitcher from '../hooks/useThemeSwitcher';


export default function HeaderHome() {
  const dispatch: DispatchType = useDispatch();

  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);

  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { arrBooking } = useSelector((state: RootState) => state.bookingReducer)

  const address = arrBooking.filter((ele, ind) => ind === arrBooking.findIndex(elem => elem.address === ele.address))
  const renderLogin = () => {
    if (userLogin?.name) {
      return (
        <>
          <li>
            <NavLink className="dropdown-item" to="/profile">
              <i className="bi bi-person-check"></i> Profile: {userLogin.name}
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="/place/new">
              <i className="bi bi-plus-circle-fill"></i> New Place
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item" to="/place/list-rent">
              <i className="bi bi-house-check-fill"></i> Your apartment
            </NavLink>
          </li>
          <li>
            <NavLink className="dropdown-item"
              onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                window.location.href = "/user/login";
              }} to={''}>
              <i className="bi bi-box-arrow-left"></i> Log Out
            </NavLink>
          </li>
        </>
      );
    }
    return (
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
    );
  };
  const renderUser = () => {
    if (userLogin?.name) {
      return (
        <>
          <span className='text-light'>
            <i className="user fa-solid fa-user"></i> {userLogin.name} <i className="bi bi-caret-down-fill"></i>
          </span>
        </>
      )
    }
    return (
      <>
        <i className="bar fa-solid fa-bars"></i>
        <i className="user fa-solid fa-user"></i>
      </>
    );
  }

  const onSearchRoom = async (search: any) => {
    setSearch(search)
    await dispatch(getBookingLocationApi(search));
    history.push(`/list/${search}`);
  }

  const handleClick = () => {
    setIsActive(current => !current);
    if (isActive) {
      setShow(false)
    } else {
      setShow(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [mode, setMode]: any = useThemeSwitcher();
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <div className={navbar ? "header-layout border-bottom border-danger border-3  px-5 active-navbar" : "header-layout px-5"} >
      <div className="header-page">
        <div className="header-home">
          <NavLink to="/">
            <img src='./img/logonew2.jpg' className='rounded m-1 border border-danger' width='120px' alt="" />
          </NavLink>
        </div>
        <div className="header-search">
          <form onSubmit={handleSubmit}>
            <div className="form-fill border-2 border row">
              <div className="location col-9">
                <h4>Where</h4>
                <div className="destination d-flex">
                  <input
                    value={search}
                    onChange={handleChange}
                    placeholder='Search destinations' style={{ height: "32px" }} />
                  {show && <button
                    className={isActive ? 'btn p-0 visible' : 'btn p-0'}
                    onClick={() => { setSearch(""); handleClick() }}>
                    <i className="text-danger fs-5 bi bi-x-circle"></i>
                  </button>}
                </div>
              </div>
              <div className="add col-3">
                <div className="btn col-5">
                  <button type='submit'
                    onClick={() => onSearchRoom(search)}
                  >
                    <i className='fa fa-search'></i> Search
                  </button>
                </div>
              </div>
            </div>
            {search.length !== 0 && (
              <div className="result-location rounded">
                {address
                  .filter((item) => {
                    const searchTerm = search.toString().toLowerCase();
                    const location = item.address.toLowerCase();
                    const province = item.address.substring(item.address.indexOf(",") + 1).trim().toLowerCase()
                    return (
                      searchTerm &&
                      (location.startsWith(searchTerm) || province.startsWith(searchTerm)) &&
                      (location !== searchTerm || province !== searchTerm)
                    );
                  }).map((item, index) => (
                    <button
                      onClick={() => { onSearchRoom(item.address); handleClick() }}
                      className={isActive ? 'data-result p-2 invisible' : 'data-result p-2'}
                      key={index}>
                      {item.address}
                    </button>
                  ))}
              </div>
            )}
          </form>
        </div >
        <div className="header-info">
          <div className="center-info">
            <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className={`btn border-1
            ${mode === 'light' ? "bg-dark text-light border-light" : "bg-light text-dark"}`}>
              {
                mode === 'dark'
                  ? <i className="bi bi-brightness-high"></i>
                  : <i className="bi bi-moon-stars"></i>
              }
            </button>
          </div>
          <div className="right-info bg-dark">
            <li className="nav-item dropdown">
              <NavLink className="nav-link" to="" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                {renderUser()}
              </NavLink>
              <ul className="dropdown-menu list-info">
                {renderLogin()}
              </ul>
            </li>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}