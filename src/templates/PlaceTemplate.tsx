import React from 'react'
import {  Outlet } from 'react-router-dom'

export default function PlaceTemplate() {
    return (
        <div className='place-template' style={{ backgroundColor: '#da6968' }}>
            <div className="container p-5">
    
                <Outlet />
            </div>
        </div>
    )
}