import { ChangeEvent, useState } from 'react'
import { http } from '../../utils/config';
import { LoadingPage } from '../../Components/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function AvatarUpload({ addPhoto, onChange, profile, url }: any) {
    const [loading, setLoading] = useState(false)
    const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
        const files: any = event.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('avatar', files[i]);
        }
        http.post('/user/upload-avatar', data, {
            headers: { 'Content-type': 'multipart/form-data' },
        }).then(async response => {
            const avatar = response.data.content;
            onChange(avatar);
            const result = await http.post('/user/avatar', { profile, avatar })
            if (result.status === 200) {
                toast.success('Change Avatar Success', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    onClose: () => window.location.href = "/profile"
                });
            }
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
            <div className="mb-3 d-flex flex-column">
                {!url
                    ?
                    <div className='col-12'>
                        <img className='rounded-circle border border-4 p-1'
                            src={`https://www.gravatar.com/avatar/${profile}?d=identicon`}
                            style={{ width: "160px", height: "150px" }} />
                    </div>
                    :
                    <>
                        <div className='col-12'>
                            <img className='rounded-circle border border-4 p-1' src={url}
                                alt="" style={{ width: "190px", height: "180px" }} />
                        </div>
                    </>
                }
            </div >
            < label className='p-2 mb-3 rounded-3 btn btn-secondary' style={{ cursor: "pointer" }}>
                {loading ? (
                    <LoadingPage className={`loading-spinner bg-transparent`} />
                ) : (
                    <>
                        <i className="bi bi-image"></i> Change
                    </>
                )}
                <input type="file" className='d-none' multiple
                    onChange={uploadPhoto}
                />
            </label>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </>
    )
}