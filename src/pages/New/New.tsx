import React, { useState, ChangeEvent } from 'react'
import Perk from './PerkNew';
import PhotoUpload from './PhotoUploadNew';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { http } from '../../utils/config';
import { NavLink } from 'react-router-dom';


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


    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const addNewPlace = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const result = await http.post('/place', {
            owner: userLogin._id, title, address, addPhoto, description, perk, checkIn, checkOut, maxGuest, price
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
        <div className='new-place container bg-white p-4 rounded'>
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
            <ToastContainer />
            <div className="py-5" >
                <form onSubmit={addNewPlace}>
                    <p className='fw-bold mb-2'>Title</p>
                    <input className='form-control mb-3'
                        type='text'
                        placeholder='Your title...'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <p className='fw-bold mb-2'>Address</p>
                    <input className='form-control mb-3'
                        type='text'
                        placeholder='District, Province, Country...'
                        value={address}
                        onChange={e => setAddress(e.target.value)} />
                    <PhotoUpload addPhoto={addPhoto} onChange={setAddPhoto} />
                    <p className='fw-bold mb-2'>Description</p>
                    <textarea className='form-control mb-3'
                        rows={5}
                        placeholder='Description...'
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <Perk selected={perk} onChange={setPerk} />
                    <div className='py-5 d-flex flex-row flex-wrap'>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>Check In (ex: 14h00 = enter 14)</p>
                            <input className='w-75 form-control'
                                type="text"
                                placeholder='Set time ...'
                                value={checkIn}
                                onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>Check Out (ex: 12h00 = enter 12)</p>
                            <input className='w-75 form-control'
                                type="text"
                                placeholder='Set time ...'
                                value={checkOut}
                                onChange={e => setCheckOut(e.target.value)} />
                        </div>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>Max Guest: </p>
                            <input className='w-75 form-control'
                                type="number"
                                placeholder='Set guest ...'
                                value={maxGuest}
                                onChange={e => setMaxGuest(e.target.value)} />
                        </div>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>Price($) / night:</p>
                            <input className='w-75 form-control'
                                type="price"
                                placeholder='Set price ...'
                                value={price}
                                onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <button className='btn w-100 btn-danger'>
                        Make A New Place
                    </button>
                </form>
            </div>
        </div>
    )
}