import React, { useEffect, useState } from 'react'
import { getOwnerRoomApi } from '../../redux/reducers/bookingReducer'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { NavLink } from 'react-router-dom';

export default function ListRent() {
    const dispatch: DispatchType = useDispatch();
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const { arrOwnerRoom } = useSelector((state: RootState) => state.bookingReducer);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getOwnerRoomApi(userLogin._id))
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])
    const renderListRoom = () => {
        if (Object.keys(userLogin).length === 0) {
            return (
                <div className='text-center py-3'>
                    <h4>
                        Please login or sign up to make a room for rent
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded me-2" to="/user/login">Log In</NavLink>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded" to="/user/register">Sign Up</NavLink>
                    </div>
                </div>
            )
        } else if (arrOwnerRoom.length === 0) {
            return (
                <div className='text-center py-3'>
                    <h4>
                        You don't have any room for rent yet!!!  <br />
                        Click below to add new place
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded me-2" to="/new">Add New Place</NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='py-3'>
                    {arrOwnerRoom.map((item: any, index: number) => {
                        return <div className="main p-3 d-flex flex-row flex-wrap rounded border border-2 border-success 
                        border-opacity-25" key={index}>
                            <div className="col-12 col-md-3 ">
                                <img src={item.photos[0]} alt="" className='object-fit-cover rounded w-100 h-100' />
                            </div>
                            <div className="col-12 col-md-9 detail p-3 position-relative">
                                <h5 className='fw-bold'>
                                    {item.address}
                                </h5>
                                <p>
                                    {item.title}
                                </p>
                                <p className='text-truncate'>
                                    {item.description}
                                </p>
                                <NavLink className="position-absolute pt-2 top-0 end-0" to={`/place/update-room/${item._id}`}>
                                    <i className="fs-2 bi bi-pencil-square"></i>
                                </NavLink>
                                <NavLink to={`/detail/${item._id}`} className="btn btn-outline-danger">
                                    <span>
                                        View Room Details
                                    </span>
                                </NavLink>
                            </div>
                        </div>
                    })}
                </div>
            )
        }
    }
    return (
        <div className='container bg-white p-4 rounded'>
            <NavLink to="/" className='text-decoration-none'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-sign-turn-left-fill"></i> Home
                </span>
            </NavLink>
            <div className='title text-center p-4'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-house-add"></i> Your apartment for rent
                </span>
            </div>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {renderListRoom()}
                </>
            )}
        </div>
    )
}