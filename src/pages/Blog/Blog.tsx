import React, { useState, useEffect, useContext } from 'react'
import PhotoUpload from './PhotoUploadBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { http } from '../../utils/config';
import { NavLink } from 'react-router-dom';
import { LoadingPage } from '../../Components/Icon';
import { UserContext } from '../User/UserContext';


export default function Blog() {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [mainArticle, setMainArticle] = useState('')
    const [subArticle, setSubArticle] = useState('')
    const [addPhoto, setAddPhoto] = useState<null | any>([])
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
                        Please login or sign up to make a blog.
                    </h4>
                    <div className='py-2'>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded me-2" to="/user/login">Log In</NavLink>
                        <NavLink className="text-decoration-none p-2 bg-danger text-white rounded" to="/user/register">Sign Up</NavLink>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="py-0 py-md-5" >
                    <form onSubmit={addNewBlog}>
                        <p className='fw-bold mb-2 text-dark'>💡Title</p>
                        <input className='w-100 p-2 mb-3'
                            style={{ outline: "none" }}
                            type='text'
                            placeholder='Your title...'
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        <p className='fw-bold mb-2 text-dark'>📰Summary</p>
                        <textarea className='w-100 p-2 mb-3'
                            style={{ outline: "none" }}
                            rows={5}
                            placeholder='Summary...'
                            value={summary}
                            onChange={e => setSummary(e.target.value)} />
                        <p className='fw-bold mb-2 text-dark'>📝Main Article</p>
                        <textarea className='w-100 p-2 mb-3'
                            style={{ outline: "none" }}
                            rows={5}
                            placeholder='Article main...'
                            value={mainArticle}
                            onChange={e => setMainArticle(e.target.value)} />
                        <p className='fw-bold mb-2 text-dark'>📝Sub Article</p>
                        <textarea className='w-100 p-2 mb-3'
                            style={{ outline: "none" }}
                            rows={5}
                            placeholder='Sub Article...'
                            value={subArticle}
                            onChange={e => setSubArticle(e.target.value)} />
                        <PhotoUpload addPhoto={addPhoto} onChange={setAddPhoto} />
                        <div className='text-center'>
                            <button className='btn btn-danger'
                                disabled={
                                    !(title && summary && mainArticle && subArticle)
                                }>Make A New Blog ✔️
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    const addNewBlog = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const result = await http.post('/blog', {
            author: userInfo?._id, title, summary, mainArticle, subArticle, addPhoto
        })
        if (result.data.status === 200) {
            toast.success('Successfully !!!', {
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
        <div className='new-blog bg-white container p-4 rounded'>
            <div className='title text-center p-4'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-house"></i> New Blog
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