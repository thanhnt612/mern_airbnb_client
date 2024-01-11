import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import {
  getBookingApi,
  getBookingLocationApi,
} from "../../redux/reducers/bookingReducer";
import { history } from "../../index";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import { UserContext } from "../../pages/User/UserContext";
import { logoutApi } from "../../redux/reducers/userReducer";


export default function HeaderHome() {
  const dispatch: DispatchType = useDispatch();
  const { userInfo }: any = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const { arrPlace } = useSelector((state: RootState) => state.bookingReducer);
  const [search, setSearch] = useState("");
  const address = arrPlace.filter(
    (ele, ind) =>
      ind === arrPlace.findIndex((elem) => elem.address === ele.address)
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
    <div className="header-layout px-1 px-md-2 px-lg-5 bg-dark">
      <div className="header-page flex-wrap">
        <div className="header-home col-3">
          <NavLink to="/">
            <img
              src={imageBasePath}
              className="rounded-3 m-1 bg-white"
              width="100px"
              alt=""
            />
          </NavLink>
        </div>
        <div className="header-search col-3 col-md-6 col-lg-3 d-none d-md-block">
          {/*search bar for ipad to desktop */}
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
        <div className="header-info col-7 col-md-3 
        d-flex align-items-center justify-content-end">
          <div className="center-info">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`btn border-1
            ${mode === "light"
                  ? "bg-light text-dark border-dark"
                  : "bg-dark text-light border-light"
                }`}
            >
              {mode === "dark" ? (
                <i className="bi bi-moon-stars"></i>
              ) : (
                <i className="bi bi-brightness-high"></i>
              )}
            </button>
          </div>
          <div className="right-info bg-light">
            <li className="nav-item dropdown">
              <a className="nav-link"
                role="button"
                data-bs-toggle="dropdown"
              >
                {userInfo
                  ? <>
                    <p className="text-dark border-dark m-0">
                      {userInfo.name}
                    </p>
                  </>
                  : <>
                    <span className="text-dark">
                      <i className="bar fa-solid fa-bars"></i>
                      <i className="user fa-solid fa-user"></i>
                    </span>
                  </>
                }
              </a>
              <ul className="dropdown-menu list-info">
                {userInfo?.name
                  ?
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person-check"></i> Profile: {userInfo.name}
                      </Link>
                    </li>
                    <li>
                      {userInfo?.isAdmin
                        ?
                        <Link className="dropdown-item" to="/dashboard">
                          <i className="bi bi-bar-chart-line"></i> Dashboard
                        </Link>
                        : ""
                      }
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/place/new">
                        <i className="bi bi-plus-circle-fill"></i> New Place
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/place/list-rent">
                        <i className="bi bi-house-check-fill"></i> My apartment
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/blog/new">
                        <i className="bi bi-plus-circle-fill"></i> New Blog
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/blog/list-blog">
                        <i className="bi bi-file-earmark-post-fill"></i> My Blog
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(logoutApi())
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
          </div>
        </div>

        {/* collapse search bar for mobile web */}
        <div className="header-search col-2 col-md-6 col-lg-3 d-flex d-md-none ">
          <button className="button-search-mobile btn bg-light text-dark d-block d-md-none"
            data-bs-toggle="collapse"
            data-bs-target="#searchBar">
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div className="collapse w-100 d-md-none" id="searchBar">
          <form onSubmit={handleSubmit} className="w-100 p-2 px-4">
            <div className="form-fill border border-danger rounded-5 p-2 row align-items-center bg-light">
              <div className="location">
                <div className="destination d-flex">
                  <input
                    className="w-100 border-0"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search . . ."
                    style={{ outline: "none", backgroundColor: "#f5f5f5!important" }}
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
      </div>
    </div>
  );
}
