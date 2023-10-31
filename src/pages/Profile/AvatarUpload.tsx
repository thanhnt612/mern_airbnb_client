import { ChangeEvent, useState } from 'react'
import { http } from '../../utils/config';
import { LoadingPage } from '../../Components/Icon';


export default function AvatarUpload({ addPhoto, onChange, avatar }: any) {
    const [loading, setLoading] = useState(false)
    const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('avatar', files[i]);
        }
        http.post('/user/upload', data, {
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
    return (
        <>
            <div className="mb-3">
                {addPhoto.length === 0
                    ?
                    <img className='rounded-circle'
                        src={`https://www.gravatar.com/avatar/${avatar}?d=identicon`}
                        style={{ width: "220px", height: "200px" }} />
                    :
                    <>
                        {addPhoto.map((item: any, index: number) => {
                            return <div className='col-6 col-md-3 col-lg-2 p-1 position-relative' key={index}>
                                <img className='rounded w-100' src={item}
                                    alt="" style={{ width: "200px", height: "200px" }} />
                            </div>
                        })}
                    </>
                }
                <label className='p-1 mt-3 rounded-3 btn btn-secondary' style={{ cursor: "pointer" }}>
                    {loading ? (
                        <LoadingPage className={`loading-spinner bg-transparent`} />
                    ) : (
                        <>
                            Upload Avatar
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