import { Outlet } from 'react-router-dom'

export default function UserTemplate() {
    return (
        <div className='user-template bg-white d-flex p-0'>
            <div className="background-user col-lg-6 col-xl-7"></div>
            <div className="container bg-white col-lg-6 col-xl-5">
                <Outlet />
            </div>
        </div>
    )
}