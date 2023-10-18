import React from 'react'

export default function FooterHome() {
  return (
    <div className='footer'>
      <div className="container">
        <div className="list-footer py-5 row">
          <div className="footer-1 wow col-lg-4 col-md-12">
            <p>Address</p>
            <ul>
              <li>
                <a href="https://maps.app.goo.gl/D3jhHQaDcRcRt8yUA" target='blank' className="text-decoration-none">
                  <span><i className="bi bi-geo-alt-fill"></i></span>&nbsp;
                  Go Vap District, Ho Chi Minh City, Vietnam
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-2 wow col-lg-4 col-md-12">
            <p>Reservation & Contact</p>
            <ul>
              <li>
                <a href="tel:+84398167375" className="text-decoration-none">
                  <span><i className="bi bi-telephone-fill"></i></span>&nbsp;
                  +84 398167375
                </a>
              </li>
              <li>
                <a href="mailto:nguyentruongthanh0612@gmail.com" className="text-decoration-none">
                  <span><i className="bi bi-envelope-fill"></i></span>&nbsp;
                  nguyentruongthanh0612@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-3 wow col-lg-4 col-md-12">
            <p>Newsletter</p>
            <ul>
              <form action="" className='position-relative'>
                <input type="text"
                  className='p-2 w-100'
                  placeholder='Enter your email . . .'
                  style={{ outline: "none" }}
                />
                <button className="bg-danger text-light border-0 position-absolute top-0 end-0"
                  style={{ padding: "10px" }}
                >Submit</button>
              </form>
              <br/>
              <span>Subscribe newsletter to get updates</span>
            </ul>
          </div>
        </div>
        <div className='license border-top py-3 d-flex justify-content-between align-items-center'>
          <p className='col-6'>© 2023 TravelDnD, Inc.</p>
          <ul className='col-6 d-flex justify-content-end'>
            <li>
              <a href='https://www.facebook.com/' target='blank' className="px-2 facebook">
              <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/' target='blank' className="px-2 instagram">
              <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li>
              <a href='https://twitter.com/' target='blank' className="px-2 twitter"> 
              <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li>
              <a href='http://youtube.com/' target='blank' className="px-2 youtube">
              <i className="bi bi-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}