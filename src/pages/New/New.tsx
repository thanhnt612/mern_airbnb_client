import React, { useState, useEffect, useContext } from 'react'
import Perk from './PerkNew';
import PhotoUpload from './PhotoUploadNew';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { http } from '../../utils/config';
import { NavLink } from 'react-router-dom';
import { LoadingPage } from '../../Components/Icon';
import { UserContext } from '../User/UserContext';

export default function New() {
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addPhoto, setAddPhoto] = useState<null | any>([])
    const [description, setDescription] = useState('')
    const [perk, setPerk] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState('')
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const { userInfo }: any = useContext(UserContext);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [])

    const renderNewForm = () => {
        if (!userInfo) {
            return (
                <div className='text-center py-3'>
                    <h4>
                        Please login or sign up to make a new room.
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded me-2" to="/user/login">Log In</NavLink>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded" to="/user/register">Sign Up</NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="py-5" >
                    <form onSubmit={addNewPlace}>
                        <p className='fw-bold mb-2'>🔔Title</p>
                        <input className='form-control mb-3'
                            type='text'
                            placeholder='Your title...'
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        <p className='fw-bold mb-2'>📌Address</p>
                        <input className='form-control mb-3'
                            type='text'
                            placeholder='District, Province, Country...'
                            value={address}
                            onChange={e => setAddress(e.target.value)} />
                        <PhotoUpload addPhoto={addPhoto} onChange={setAddPhoto} />
                        <p className='fw-bold mb-2'>📜Description</p>
                        <textarea className='form-control mb-3'
                            rows={5}
                            placeholder='Description...'
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        <Perk selected={perk} onChange={setPerk} />
                        <div className='py-5 d-flex flex-row flex-wrap'>
                            <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                                <p className='fw-bold'>📅Check In (14h00 = enter 14)</p>
                                <input className='w-75 form-control'
                                    type="text"
                                    placeholder='Set time ...'
                                    value={checkIn}
                                    onChange={e => setCheckIn(e.target.value)} />
                            </div>
                            <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                                <p className='fw-bold'>📅Check Out (12h00 = enter 12)</p>
                                <input className='w-75 form-control'
                                    type="text"
                                    placeholder='Set time ...'
                                    value={checkOut}
                                    onChange={e => setCheckOut(e.target.value)} />
                            </div>
                            <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                                <p className='fw-bold'>#️⃣Max Guest: </p>
                                <input className='w-75 form-control'
                                    type="number"
                                    placeholder='Set guest ...'
                                    value={maxGuest}
                                    onChange={e => setMaxGuest(e.target.value)} />
                            </div>
                            <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                                <p className='fw-bold'>Price(💲) / night:</p>
                                <input className='w-75 form-control'
                                    type="price"
                                    placeholder='Set price ...'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-danger'
                                disabled={
                                    !(title && address && description && checkIn && checkOut && price)
                                }>Make A New Place ✔️
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    const addNewPlace = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const result = await http.post('/place', {
            owner: userInfo?._id, title, address, addPhoto, description, perk, checkIn, checkOut, maxGuest, price
        })
        if (result.data.status === 200) {
            toast.success('Make a room successfully !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/"
            });
        }
        if (result.data.status === 400) {
            toast.error('Please fill in information !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (result.data.status === 401) {
            toast.error('Information is existed !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (result.data.status === 402) {
            toast.error('Please login to your account !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    return (
        <div className='new-place bg-white container p-4 rounded'>
            <NavLink to="/" className='text-decoration-none'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-sign-turn-left-fill"></i> Home
                </span>
            </NavLink>
            <div className='title text-center p-4'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-house"></i> New Place
                </span>
            </div>
            {loading ? (
                <LoadingPage className={`loading-spinner bg-transparent mt-5`} />
            ) : (
                <>
                    {renderNewForm()}
                </>
            )}
            <ToastContainer />
        </div>
    )
}