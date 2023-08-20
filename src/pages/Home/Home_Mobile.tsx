import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { history } from '../../index';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getBookingApi, getBookingLocationApi } from '../../redux/reducers/bookingReducer';

export default function Home() {
  const dispatch: DispatchType = useDispatch();
  const content = useRef(null);
  const [loading, setLoading] = useState(false)
  const { arrBooking } = useSelector((state: RootState) => state.bookingReducer);
  const listProvince = arrBooking.filter((ele, ind) => ind === arrBooking.findIndex(elem => elem.address === ele.address))

  useEffect(() => {
    dispatch(getBookingApi())
    if (arrBooking.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [arrBooking.length])

  const onList = async (event: any) => {
    await dispatch(getBookingLocationApi(event));
    history.push(`/list/${event}`);
  }
  //scroll To section page
  const scrollToSection = (link: any) => {
    window.scrollTo({
      top: link.current.offsetTop,
      behavior: "smooth",
    });
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div className='home-page-mobile'>
      <div className="carousel">
        <div id="carouselExampleCaptions" className="slider carousel slide"
          data-bs-ride="carousel">
          <div className="introduce container d-none d-md-block">
            <h3>Let's start the journey</h3>
            <button className='btn'
              onClick={() => scrollToSection(content)}>
              👉 Booking your table now! 👈
            </button>
          </div>
          <div className="carousel-indicators" style={{ zIndex: "3" }}>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={3} aria-label="Slide 4" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={4} aria-label="Slide 5" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={5} aria-label="Slide 6" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={6} aria-label="Slide 7" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={7} aria-label="Slide 8" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2000">
              <img src="../../img/slider/tphcm.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Ho Chi Minh</h5>
                <p>District 1</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/hanoi.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Ha Noi</h5>
                <p>Ho Hoan Kiem Lake</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/cantho.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Can Tho</h5>
                <p>Ninh Kieu Wharf</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/nhatrang.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Khanh Hoa</h5>
                <p>Nha Trang City</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/phuquoc.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Kien Giang</h5>
                <p>Phu Quoc</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/danang.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Da Nang</h5>
                <p>Hai Chau District </p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/dalat.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Lam Dong</h5>
                <p>Da Lat</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/phanthiet.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block" style={{ zIndex: "2" }}>
                <h5>Binh Thuan</h5>
                <p>Phan Thiet</p>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='content' ref={content}>
        <div className="main">
          <div className="list-detail">
            <div className="tittle text-center">
              <h3>Rooms</h3>
            </div>
            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="room-detail">
                <div className="booking-room row">
                  <Carousel
                    showDots={true}
                    responsive={responsive}
                  >
                    {arrBooking.map((room, index) => {
                      return <div className='p-3' key={index}>
                        <div className="room-body rounded d-flex flex-column mb-4 
                    bg-light border border-2 
                    border-success border-opacity-25 
                    wow">
                          <div className="thumbnail col-12">
                            <img src={room.photos[0]}
                              className='w-100 rounded-top' alt="" />
                          </div>
                          <div className="detail rounded-bottom col-12 p-2" style={{ width: "300px" }}>
                            <div className="info">
                              <h5>🏩{room.address}</h5>
                              <p className='mb-1 text-truncate' style={{ height: "36px" }}>🔔{room.title}</p>
                              <p><span className='fw-bold'>💲{room.price}</span> - night</p>
                            </div>
                            <div className="view-more">
                              <div className="button">
                                <NavLink to={`/detail/${room._id}`} className="btn">
                                  <span>
                                    View
                                  </span>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    })}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
          <div className="list container mb-5">
            <div className="title text-center pb-3">
              <h3>Discover the beautiful places around the Vietnam</h3>
            </div>
            <div className="menu" ref={content}>
              {loading ? (
                <div className="loader-container">
                  <div className="spinner"></div>
                </div>
              ) : (
                <div className="row">
                  {listProvince.map((location, index) => {
                    return <div className="list-city col-12 col-md-6 pb-3" key={index}>
                      <div className={`list-room item-${index} bg-light d-flex flex-column p-3 border border-2 
                      border-success border-opacity-25 rounded wow`}>
                        <div className="detail p-2 col-12 d-flex flex-row justify-content-between">
                          <h5 className='text-center col-8' onClick={() => onList(location.address)}>
                            📌{location.address}
                          </h5>
                          <div className="locate col-4 text-center">
                            <button className="btn" onClick={() => onList(location.address)}>
                            👉 List
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="convenient container">
            <div className="tittle">
              <h3>Wherever</h3>
            </div>
            <div className="main row">
              <div className="service wow item-1 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/home.png" className='w-100 rounded' alt="" />
                </div>
                <p>Whole House</p>
              </div>
              <div className="service wow item-2 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/special.jpg" className='w-100 rounded ' alt="" />
                </div>
                <p>Unique Accommodation</p>
              </div>
              <div className="service wow item-3 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/farm.jpg" className='w-100 rounded' alt="" />
                </div>
                <p>Farm And Nature</p>
              </div>
              <div className="service wow item-4 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/dog.png" className='w-100 rounded' alt="" />
                </div>
                <p>Pets allowed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}