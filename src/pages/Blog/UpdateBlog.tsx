import React, { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useParams } from 'react-router-dom';
import { http } from '../../utils/config';
import { UserContext } from '../User/UserContext';
import PhotoUpload from './PhotoUploadBlog';

export const UpdateBlog = () => {
    const params = useParams();
    const id = params.id
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [mainArticle, setMainArticle] = useState('')
    const [subArticle, setSubArticle] = useState('')
    const [addPhoto, setAddPhoto] = useState([])
    const { userInfo }: any = useContext(UserContext);

    useEffect(() => {
        if (!id) {
            return;
        }
        http.get('/blog/' + params.id).then(response => {
            const { data } = response;
            setTitle(data.content.title);
            setAddPhoto(data.content.photos);
            setSummary(data.content.summary);
            setMainArticle(data.content.mainArticle);
            setSubArticle(data.content.subArticle);
        });
    }, [id]);

    const updateBlog = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const blog = {
            author: userInfo?._id, title, summary,
            addPhoto, mainArticle, subArticle
        }
        const result = await http.put('/blog/' + id, {
            ...blog
        })
        if (result.data.status === 200) {
            toast.success('Update blog successfully !!!', {
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
            toast.error('The blog is not defined !!!', {
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
        <div className='container update-blog bg-white p-4 rounded'>
            <div className='title text-center p-4'>
                <span className='p-2 rounded-pill text-white bg-danger'>
                    <i className="bi bi-house"></i> Edit Your Blog
                </span>
            </div>
            <ToastContainer />
            <div className="py-3">
                <form onSubmit={updateBlog}>
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
                            }>Update ✔️
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
