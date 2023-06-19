import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { getBookingLocationApi } from '../../redux/reducers/bookingReducer'
import { USER_LOGIN } from '../../utils/config';
import { history } from "../../index";

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
                            Profile: {userLogin.name}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item" to="/new">
                            New Place
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item" to="/list-rent">
                            Your apartment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item"
                            onClick={() => {
                                localStorage.removeItem(USER_LOGIN);
                                window.location.href = "/user/login";
                            }} to={''}>
                            Log Out
                        </NavLink>
                    </li>
                </>
            );
        }
        return (
            <>
                <li><NavLink className="dropdown-item" to="/user/register">Sign Up</NavLink></li>
                <li><NavLink className="dropdown-item" to="/user/login">Log In</NavLink></li>
            </>
        );
    };
    const renderUser = () => {
        if (userLogin?.name) {
            return (
                <>
                    <span>Hi!! {userLogin.name}</span>
                </>
            )
        }
        return (
            <>
                <i className="user fa-solid fa-user"></i>
            </>
        );
    }

    const onSearchRoomMobile = async (search: any) => {
        setSearch(search)
        await dispatch(getBookingLocationApi(search));
        history.push(`/list/${search}`);
    }

    const handleClickMobile = () => {
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
    return (
        <div className='header-layout-mobile'>
            <div className="header-page">
                <div className="header-home">
                    <NavLink to="/">
                        <img src='./img/logo.png' alt="" />
                    </NavLink>
                </div>
                <div className="header-info">
                    <div className="right-info">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bar fa-solid fa-bars"></i>
                                {renderUser()}
                            </NavLink>
                            <ul className="dropdown-menu list-info">
                                {renderLogin()}
                                <li><hr /></li>
                                <li><NavLink className="dropdown-item" to="">Airbnb your home</NavLink></li>
                                <li><NavLink className="dropdown-item" to="">Help</NavLink></li>
                            </ul>
                        </li>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-search">
                <form onSubmit={handleSubmit}>
                    <div className="form-fill">
                        <div className="location col-8">
                            <h4>Where</h4>
                            <div className="destination d-flex">
                                <input className='w-100'
                                    value={search}
                                    onChange={handleChange}
                                    placeholder='Search destinations' style={{ height: "32px" }} />
                                {show && <button
                                    className={isActive ? 'btn p-0 visible' : 'btn p-0'}
                                    onClick={() => { setSearch(""); handleClickMobile() }}>
                                    <i className="text-danger fs-5 bi bi-x-circle"></i>
                                </button>}
                            </div>
                        </div>
                        <div className="add col-4">
                            <div className="btn">
                                <button type='submit' onClick={() => onSearchRoomMobile(search)}>
                                    <i className='fa fa-search'></i> Search
                                </button>
                            </div>
                        </div>
                    </div>
                    {search.length !== 0 && (
                        <div className="result-location">
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
                                        onClick={() => { onSearchRoomMobile(item.address); handleClickMobile() }}
                                        className={isActive ? 'data-result p-2 invisible' : 'data-result p-2'}
                                        key={index}>
                                        {item.address}
                                    </button>
                                ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}