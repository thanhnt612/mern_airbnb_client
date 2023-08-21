import React, { useState, useEffect } from 'react'
import Perk from './PerkUpdate';
import PhotoUpload from './PhotoUploadUpdate';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useParams } from 'react-router-dom';
import { http } from '../../utils/config';

export default function Update() {
    const params = useParams();
    const id = params.id
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addPhoto, setAddPhoto] = useState([])
    const [description, setDescription] = useState('')
    const [perk, setPerk] = useState([])
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState('')
    const [price, setPrice] = useState('')
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        if (!id) {
            return;
        }
        http.get('/place/' + params.id).then(response => {
            const { data } = response;
            setTitle(data.content.title);
            setAddress(data.content.address);
            setAddPhoto(data.content.photos);
            setDescription(data.content.description);
            setPerk(data.content.perks);
            setCheckIn(data.content.checkIn);
            setCheckOut(data.content.checkOut);
            setMaxGuest(data.content.maxGuest);
            setPrice(data.content.price);
        });
    }, [id]);

    const updatePlace = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const place = {
            owner: userLogin._id, title, address,
            addPhoto, description, perk, checkIn,
            checkOut, maxGuest, price
        }
        const result = await http.put('/place/' + id, {
            ...place
        })
        if (result.data.status === 200) {
            toast.success('Update room successfully !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/list-rent"
            });
        }
        if (result.data.status === 204 || result.data.status === 400) {
            toast.error('The room is not defined !!!', {
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
        <div className='container update-place bg-white p-4 rounded'>
            <NavLink to="/" className='text-decoration-none'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-sign-turn-left-fill"></i> Home
                </span>
            </NavLink>
            <div className='title text-center p-4'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-house"></i> Edit Your Place
                </span>
            </div>
            <ToastContainer />
            <div className="py-5">
                <form onSubmit={updatePlace}>
                    <p className='fw-bold mb-2'>🔔Title</p>
                    <input className='form-control mb-3'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <p className='fw-bold mb-2'>📌Address</p>
                    <input className='form-control mb-3'
                        type='text'
                        placeholder='Address'
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
                                placeholder='Set time...'
                                value={checkIn}
                                onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>📅Check Out (12h00 = enter 12)</p>
                            <input className='w-75 form-control'
                                type="text"
                                placeholder='Set time...'
                                value={checkOut}
                                onChange={e => setCheckOut(e.target.value)} />
                        </div>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>#️⃣Max Guest:</p>
                            <input className='w-75 form-control'
                                type="text"
                                placeholder='Set guest...'
                                value={maxGuest}
                                onChange={e => setMaxGuest(e.target.value)} />
                        </div>
                        <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                            <p className='fw-bold'>Price(💲) / night:</p>
                            <input className='w-75 form-control'
                                type="text"
                                placeholder='Set price...'
                                value={price}
                                onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <button className='btn w-100 btn-danger'>
                        Update ✔️
                    </button>
                </form>
            </div>
        </div>
    )
}