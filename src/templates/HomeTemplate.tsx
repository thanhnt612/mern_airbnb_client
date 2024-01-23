import { Outlet } from 'react-router-dom';
import HeaderHome from '../Components/HeaderHome/HeaderHome';
import FooterHome from '../Components/FooterHome/FooterHome';

export default function HomeTemplate() {

  return (
    <div>
      <HeaderHome/>
      <div className='home-template' 
      // style={{ minHeight: '88vh' }}
      >
        <Outlet />
      </div>
      <FooterHome/>
    </div>
  )
}