import React, { ChangeEvent, useState } from 'react'
import { http } from '../../utils/config';
import { LoadingPage } from '../../Components/Icon';

export default function PhotoUpload({ addPhoto, onChange }: any) {
    const [loading, setLoading] = useState(false)
    const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('blog', files[i]);
        }
        http.post('/blog/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data } = response;
            const newObject = [...addPhoto, ...data.content];
            onChange(newObject);
        })
        if (addPhoto.length === 0) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 4000)
        } else {
            setLoading(false);
        }
    }
    const removePhoto = (e: React.SyntheticEvent, link: any) => {
        e.preventDefault();
        onChange([...addPhoto.filter((photo: string) => photo !== link)])
    }
    return (
        <>
            <p className='fw-bold mb-2 text-dark'>📷Photo (Maximum 3 photos)</p>
            <div className="d-flex flex-row flex-wrap mb-3">
                {addPhoto.map((item: any, index: number) => {
                    return <div className='col-6 col-md-3 col-lg-2 p-1 position-relative' key={index}>
                        <img className='rounded w-100' src={item} alt="" style={{ minHeight: "100%" }} />
                        <button onClick={ev => removePhoto(ev, item)} className='btn btn-dark position-absolute bottom-0 end-0 m-2'>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                })}
                <label className='col-6 col-md-3 col-lg-2 p-5 border border-1 border-dark rounded 
                text-dark bg-white d-flex align-items-center justify-content-center' style={{ cursor: "pointer" }}>
                    {loading ? (
                        <LoadingPage className={`loading-spinner bg-transparent`} />
                    ) : (
                        <>
                            <i className="fs-4 bi bi-cloud-arrow-up"></i>&nbsp;Upload
                        </>
                    )}
                    <input type="file" className='d-none' multiple
                        onChange={uploadPhoto}
                    />
                </label>
            </div>
        </>
    )
}