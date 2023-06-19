import React, { ChangeEvent, useState } from 'react'
import axios from 'axios';

export default function PhotoUpload({ addPhoto, onChange }: any) {
    const [photoLink, setPhotoLink] = useState('')
    const addPhotoLink = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-link', { link: photoLink });
        const newObject = [...addPhoto, filename];
        onChange(newObject);
        setPhotoLink('')
    }
    const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload-source', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data: filenames } = response;
            const newObject = [...addPhoto, ...filenames];
            onChange(newObject);
        })
    }
    const removePhoto = (link: any) => {
        onChange([...addPhoto.filter((photo: string) => photo !== link)])

    }
    return (
        <>
            <p className='fw-bold mb-2'>Photo</p>
            <div className='d-flex mb-3 col-12 col-md-8'>
                <input className='form-control'
                    type='text'
                    placeholder='Add a link jpg'
                    value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)} />
                <button onClick={addPhotoLink} className='btn text-white bg-danger'>
                    <i className="bi bi-plus-square"></i>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap mb-3">
                {addPhoto.map((item: any, index: number) => {
                    return <div className='col-6 col-md-3 col-lg-2 col-2 p-1 position-relative' key={index}>
                        <img className='rounded w-100' src={'http://localhost:8080/uploads/' + item} alt="" style={{ minHeight: "100%" }} />
                        <button onClick={() => removePhoto(item)} className='btn btn-dark position-absolute bottom-0 end-0 m-2'>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                })}
                <label className='col-6 col-md-3 col-lg-2 p-5 border rounded bg-white d-flex align-items-center justify-content-center' style={{ cursor: "pointer" }}>
                    <i className="bi bi-cloud-arrow-up"></i> Upload
                    <input type="file" className='d-none' multiple
                        onChange={uploadPhoto} />
                </label>
            </div>
        </>
    )
}