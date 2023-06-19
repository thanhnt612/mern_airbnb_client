import React from 'react'
import { Outlet } from 'react-router-dom';
import FooterHome_Mobile from '../Components/FooterHome/FooterHome_Mobile';
import HeaderHome from '../Components/HeaderHome/HeaderHome';
import HeaderHome_Mobile from '../Components/HeaderHome/HeaderHome_Mobile';
import ResponsiveItem from '../Components/ResponsiveItem/ResponsiveItem';
import FooterHome from '../Components/FooterHome/FooterHome';

export default function HomeTemplate() {
  return (
    <div>
      <ResponsiveItem component={HeaderHome} mobileComponent={HeaderHome_Mobile} />
      <div className='home-template' style={{ minHeight: '88vh' }}>
        <Outlet />
      </div>
      <ResponsiveItem component={FooterHome} mobileComponent={FooterHome_Mobile} />
    </div>
  )
}