import { Outlet } from 'react-router-dom'
import HeaderHome from '../Components/HeaderHome/HeaderHome'
import FooterHome from '../Components/FooterHome/FooterHome'

export default function BlogTemplate() {
    return (
        <div>
            <HeaderHome />
            <div className='blog-template  border-bottom border-dark border-2'
                style={{ height: '100%' }}>
                <div className="container p-0 p-md-4 ">
                    <Outlet />
                </div>
            </div>
            <FooterHome />
        </div>
    )
}