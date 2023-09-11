import React from 'react'
import {  Outlet } from 'react-router-dom'

export default function PlaceTemplate() {
    return (
        <div className='place-template' style={{ backgroundColor: '#da6968',height:'1080px' }}>
            <div className="container p-0 p-md-5">
                <Outlet />
            </div>
        </div>
    )
}