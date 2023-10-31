import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { ACCESS_TOKEN, settings } from "../../utils/config";
import {
  getBookingApi,
  getBookingLocationApi,
} from "../../redux/reducers/bookingReducer";
import { history } from "../../index";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import { UserContext } from "../../pages/User/UserContext";



export default function HeaderHome() {
  const dispatch: DispatchType = useDispatch();
  const { userInfo }: any = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const { arrBooking } = useSelector((state: RootState) => state.bookingReducer);
  const [search, setSearch] = useState("");
  const address = arrBooking.filter(
    (ele, ind) =>
      ind === arrBooking.findIndex((elem) => elem.address === ele.address)
  );
  useEffect(() => {
    dispatch(getBookingApi());
  }, []);
  const imageBasePath =
    window.location.protocol +
    "//" +
    window.location.host +
    "/img/logo.png";

  const onSearchRoom = async (search: any) => {
    setSearch(search);
    await dispatch(getBookingLocationApi(search));
    history.push(`/list/${search}`);
  };

  const handleClick = () => {
    setIsActive((current) => !current);
    if (isActive) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
    <div
      className={
        navbar
          ? "header-layout border-bottom border-danger border-1  px-1 px-md-2 px-lg-5 active-navbar"
          : "header-layout  px-1 px-md-2 px-lg-5"
      }
    >
      <div className="header-page flex-wrap py-1">
        <div className="header-home order-0 col-6 col-md-3">
          <NavLink to="/">
            <img
              src={imageBasePath}
              className="rounded-3 m-1 bg-white"
              width="100px"
              alt=""
            />
          </NavLink>
        </div>
        <div className="header-search order-3 order-md-2 col-12 col-md-6 col-lg-3">
          <form onSubmit={handleSubmit} className="w-100">
            <div className="form-fill border border-danger rounded-5 p-2 row align-items-center">
              <div className="location">
                <div className="destination d-flex">
                  <input
                    className="w-100"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search . . ."
                  />
                  {show && (
                    <button
                      className={isActive ? "btn p-0 visible" : "btn p-0"}
                      onClick={() => {
                        setSearch("");
                        handleClick();
                      }}
                    >
                      ❌
                    </button>
                  )}
                </div>
              </div>
            </div>
            {search?.length !== 0 && (
              <div className="result-location rounded">
                {address
                  .filter((item) => {
                    const searchTerm = search?.toString().toLowerCase();
                    const location = item.address.toLowerCase();
                    const province = item.address
                      .substring(item.address.indexOf(",") + 1)
                      .trim()
                      .toLowerCase();
                    return (
                      searchTerm &&
                      (location.startsWith(searchTerm) ||
                        province.startsWith(searchTerm)) &&
                      (location !== searchTerm || province !== searchTerm)
                    );
                  })
                  .map((item, index) => (
                    <button
                      onClick={() => {
                        onSearchRoom(item.address);
                        handleClick();
                      }}
                      className={
                        isActive
                          ? "data-result p-2 invisible"
                          : "data-result p-2 border border-danger"
                      }
                      key={index}
                    >
                      {item.address}
                    </button>
                  ))}
              </div>
            )}
          </form>
        </div>
        <div className="header-info order-2 order-md-3 col-6 col-md-3 
        d-flex align-items-center justify-content-end">
          <div className="center-info">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`btn border-1
            ${mode === "light"
                  ? "bg-dark text-light border-light"
                  : "bg-light text-dark"
                }`}
            >
              {mode === "dark" ? (
                <i className="bi bi-brightness-high"></i>
              ) : (
                <i className="bi bi-moon-stars"></i>
              )}
            </button>
          </div>
          <div className="right-info bg-dark">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link"
                to=""
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userInfo
                  ? <>
                    <p className="text-light m-0">
                      {userInfo.name}
                    </p>
                  </>
                  : <>
                    <span className="text-light">
                      <i className="bar fa-solid fa-bars"></i>
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
                      <NavLink className="dropdown-item" to="/blog/new">
                        <i className="bi bi-plus-circle-fill"></i> New Blog
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/blog/list-blog">
                        <i className="bi bi-file-earmark-post-fill"></i> Your Blog
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => {
                          settings.eraseCookie(ACCESS_TOKEN);
                          window.location.href = "/";
                        }}
                        to={""}
                      >
                        <i className="bi bi-box-arrow-left"></i> Log Out
                      </NavLink>
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
