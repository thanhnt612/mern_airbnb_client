import React, { ChangeEvent, useState } from 'react'
import { http } from '../../utils/config';

export default function PhotoUpload({ addPhoto, onChange }: any) {
    const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('picture', files[i]);
        }
        http.post('/upload-source', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data } = response;
            const newObject = [...addPhoto, ...data.content];
            onChange(newObject);
        })
    }
    const removePhoto = (e: React.SyntheticEvent, link: any) => {
        e.preventDefault();
        onChange([...addPhoto.filter((photo: string) => photo !== link)])
    }
    return (
        <>
            <p className='fw-bold mb-2'>📷Photo</p>
            <div className="d-flex flex-row flex-wrap mb-3">
                {addPhoto.map((item: any, index: number) => {
                    return <div className='col-6 col-md-3 col-lg-2 col-2 p-1 position-relative' key={index}>
                        <img className='rounded w-100' src={item} alt="" style={{ minHeight: "100%" }} />
                        <button onClick={ev => removePhoto(ev, item)} className='btn border border-light btn-dark position-absolute bottom-0 end-0 m-2'>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                })}
                <label className='col-6 col-md-3 col-lg-2 p-5 border rounded bg-white text-dark d-flex align-items-center justify-content-center' style={{ cursor: "pointer" }}>
                    <i className="fs-4 bi bi-cloud-arrow-up"></i>&nbsp;Upload
                    <input type="file" className='d-none' multiple
                        onChange={uploadPhoto} />
                </label>
            </div>
        </>
    )
}