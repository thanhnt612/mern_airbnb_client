import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import HeaderHome from '../Components/HeaderHome/HeaderHome';
import ResponsiveItem from '../Components/ResponsiveItem/ResponsiveItem';
import FooterHome from '../Components/FooterHome/FooterHome';


export default function HomeTemplate() {

  return (
    <div>
      <ResponsiveItem component={HeaderHome}/>
      <div className='home-template' style={{ minHeight: '88vh' }}>
        <Outlet />
      </div>
      <ResponsiveItem component={FooterHome} />
    </div>
  )
}