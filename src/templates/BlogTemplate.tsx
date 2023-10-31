import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveItem from '../Components/ResponsiveItem/ResponsiveItem'
import HeaderHome from '../Components/HeaderHome/HeaderHome'
import FooterHome from '../Components/FooterHome/FooterHome'

export default function BlogTemplate() {
    return (
        <div>
            <ResponsiveItem component={HeaderHome} />
            <div className='blog-template  border-bottom border-dark border-2 p-0 p-md-5'
                style={{ height: '100%' }}>
                <div className="container p-0 p-4 ">
                    <Outlet />
                </div>
            </div>
            <ResponsiveItem component={FooterHome} />
        </div>
    )
}