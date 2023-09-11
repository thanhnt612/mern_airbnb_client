import React from 'react'
import { Outlet } from 'react-router-dom'

export default function UserTemplate() {

    return (
        <div className='user-template'>
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
}