import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getBlogApi, getBookingApi, getBookingLocationApi } from '../../redux/reducers/bookingReducer';
import { history } from '../../index';
import { LoadingPage } from '../../Components/Icon';
import ReactPlayer from 'react-player';


export default function Home() {
  const dispatch: DispatchType = useDispatch();
  const content = useRef(null);
  const { arrBooking } = useSelector((state: RootState) => state.bookingReducer);
  const { arrBlog } = useSelector((state: RootState) => state.bookingReducer);
  const [loading, setLoading] = useState(false)

  //Call Api
  useEffect(() => {
    dispatch(getBookingApi())
    dispatch(getBlogApi())
    // dispatch(getProfileApi(token))
  }, [])

  useEffect(() => {
    if (arrBooking.length === 0 || arrBlog.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [arrBooking.length, arrBlog.length])

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
  //Responsive for tag Carousel 
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  const responsive_pic = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  return (
    <div className='home-page'>
      <div className="carousel">
        <div id="carouselExampleCaptions" className="slider carousel slide"
          data-bs-ride="carousel">
          <div className="introduce container">
            <h1>𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝑻𝒓𝒂𝒗𝒆𝒍𝑫𝒏𝑫</h1>
            <button className='btn'
              onClick={() => scrollToSection(content)}>
              👉 Let's start the journey 👈
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
                height="1080px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Ho Chi Minh</h5>
                <p>District 1</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/hanoi.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Ha Noi</h5>
                <p>Ho Hoan Kiem Lake</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/cantho.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Can Tho</h5>
                <p>Ninh Kieu Wharf</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/nhatrang.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Khanh Hoa</h5>
                <p>Nha Trang City</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/phuquoc.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Kien Giang</h5>
                <p>Phu Quoc</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/danang.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Da Nang</h5>
                <p>Hai Chau District </p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/dalat.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                <h5>Lam Dong</h5>
                <p>Da Lat</p>
              </div>
              <div className="overlay"></div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/phanthiet.jpg"
                className="d-block"
                width="100%"
                height="850px"
                alt="..." />
              <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
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
      <div className="about row w-100 m-0 justify-content-center">
        <div className="about-left container py-3 d-flex flex-column justify-content-center align-items-start col-lg-12 col-xl-6">
          <h3 className='fw-bold text-center'>About Us</h3>
          <p>
            Place Booking at <span className='text-danger'>𝑻𝒓𝒂𝒗𝒆𝒍𝑫𝒏𝑫</span>
          </p>
          <p>
            From mountain peaks to rainforests to tropical beaches,
            luxury hotels with nature offer some of the most stunning scenery in the world.
            Wake up to the sound of birdsong and fall asleep under the stars. <br /> <br />
            Many luxury hotels with nature are committed to sustainable practices, such as using renewable energy, reducing waste, and supporting local communities. You can feel good about staying at a hotel that is doing its part to protect the environment.
          </p>
          <NavLink to="/about" className='rounded-pill fw-bold text-decoration-none'>
            Learn more
          </NavLink>
        </div>
        <div className="about-right col-lg-12 col-xl-6 d-flex 
        justify-content-center align-items-center gap-3">
          <div className="pic-about position-relative">
            <div className="thumbnail">
              <img src="../../img/about/about_1.png" className='w-100 rounded-3 wow pic-1'
              />
            </div>
            <div className="detail text-center position-absolute bottom-0 w-100 d-flex flex-column justify-content-center">
              <p className='text-light'>Nha Trang,Vietnam</p>
              <h3 className="text-light fw-800">Blue Apartment</h3>
            </div>
          </div>
          <div className="pic-about position-relative">
            <div className="thumbnail">
              <img src="../../img/about/about_2.png" className='w-100 rounded-3 wow pic-2' />
            </div>
            <div className="detail text-center position-absolute bottom-0 w-100 d-flex flex-column justify-content-center">
              <p className='text-light'>Phu Quoc,Vietnam</p>
              <h3 className="text-light fw-800">Seascape Villa</h3>
            </div>
          </div>
          <div className="pic-about position-relative ">
            <div className="thumbnail">
              <img src="../../img/about/about_3.png" className='w-100 rounded-3 wow pic-2' />
            </div>
            <div className="detail text-center position-absolute bottom-0 w-100 d-flex flex-column justify-content-center">
              <p className='text-light'>Phan Thiet,Vietnam</p>
              <h3 className="text-light fw-800">Panorama Villa</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='content pb-5'>
        <div className="main">
          <div className="list-detail" ref={content}>
            <div className="tittle text-center">
              <h3 className='fw-bold'>Apartment</h3>
            </div>
            {loading ? (
              <LoadingPage className={`loading-spinner bg-transparent mt-5`} />
            ) : (
              <div className="room-detail container">
                <div className="booking-room">
                  <Carousel
                    showDots={true}
                    responsive={responsive}
                    arrows={false}
                  >
                    {arrBooking.map((room, index) => {
                      return <div className='p-3' key={index}>
                        <div className="room-body rounded-3 mb-5 d-flex flex-column bg-light wow">
                          <div className="thumbnail  col-12">
                            <Carousel
                              showDots={true}
                              responsive={responsive_pic}
                            >
                              {room.photos.map((pic: any) => {
                                return (
                                  <img src={pic}
                                    className='w-100 rounded-top' alt="" key={index} />
                                )
                              })}
                            </Carousel>
                          </div>
                          <div className="detail rounded-bottom col-12 p-3 shadow">
                            <div className="info">
                              <h5 className='text-truncate'>🏩{room.address}</h5>
                              <p className='text-truncate mb-1'>🔔{room.title}</p>
                              <p><span className='fw-bold'>💲{room.price}</span> - night</p>
                            </div>
                            <div className="view-more">
                              <div className="button">
                                <NavLink to={`/detail/${room._id}`} className="btn">
                                  Book Now
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
        </div>
      </div>
      <div className="banner container-fluid my-5 p-0">
        <div className="tittle text-center">
          <h3 className='fw-bold mb-5'>Discovery Places</h3>
        </div>
        <ReactPlayer
          url="../../video/discovery-video.mp4"
          width="100%"
          height="100%"
          muted={true}
          loop={true}
          playing
          light="../../img/discovery.jpg"
          playIcon={
            <div className='main position-relative'>
              <div className="wrapper" style={{ zIndex: "2" }}>
                <div className="video-main">
                  <div className="promo-video">
                    <div className="waves-block">
                      <div className="waves wave-1"></div>
                      <div className="waves wave-2"></div>
                      <div className="waves wave-3"></div>
                    </div>
                  </div>
                  <a className="video video-popup mfp-iframe" data-lity>
                    <i className="fs-2 text-danger bi bi-play-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          } />
      </div>
      <div className="blog py-5 container">
        <div className="tittle text-center">
          <h3 className='fw-bold py-3'>Blog</h3>
        </div>
        {loading ? (
          <LoadingPage className={`loading-spinner bg-transparent mt-5`} />
        ) : (
          <div className="main d-flex flex-row flex-wrap justify-content-md-center justify-content-lg-start">
            {arrBlog.filter((item, index) => index < 3).map((blog, index) => {
              let date = new Date(blog.createdAt).toLocaleDateString('en-GB');
              return <div className='item col-12 col-md-4 p-2' key={index}>
                <div className="thumbnail position-relative">
                  <div className="picture">
                    <NavLink to={`/blog/detail/${blog._id}`}>
                      <img src={blog.photos[0]} className="w-100" />
                    </NavLink>
                  </div>
                  <div className="calendar  fw-700 position-absolute text-center">

                  </div>
                </div>
                <div className="detail border rounded-bottom shadow p-2 p-lg-3">
                  <p className='comment mb-0'>
                    <NavLink className="text-decoration-none text-dark me-4" to="/">
                      <i className="text-danger bi bi-person" /> Author
                    </NavLink>
                    <NavLink className="text-decoration-none text-dark " to="/">
                      <i className="text-danger bi bi-chat" /> 0 Comments
                    </NavLink>
                  </p>
                  <p className='fw-bold pt-2 text-truncate mb-0'>
                    <NavLink to={`/blog/detail/${blog._id}`} className="text-decoration-none text-dark fw-700 ">{blog.title}</NavLink>
                  </p>
                  <div className="w-50 my-3 border-danger border-3 border-bottom" />
                  <p className="text-truncate mb-2">
                    {blog.article}
                  </p>
                  <NavLink to={`/blog/detail/${blog._id}`} className="read-more text-decoration-none btn btn-danger">READ MORE &gt;</NavLink>
                </div>

              </div>
            })}
            <div className="w-100 p-2 text-center py-4">
              <button className="btn btn-danger">
                View More
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="media row m-0 p-0">
        <div className="tittle text-center">
          <h3 className='fw-bold py-3'>Media</h3>
        </div>
        <div className="item position-relative p-0 col-3">
          <a href="https://www.instagram.com/" className='position-absolute link fs-2 text-light'>
            <i className="bi bi-instagram"></i>
          </a>
          <p className='m-0 p-3 fs-3 fw-bold position-absolute description text-light'>Instagram</p>
          <img src="../../img/news/ins_1.png" className='w-100' alt="" />
        </div>
        <div className="item position-relative p-0 col-3">
          <a href="https://www.instagram.com/" className='position-absolute link fs-2 text-light'>
            <i className="bi bi-instagram"></i>
          </a>
          <p className='m-0 p-3 fs-3 fw-bold position-absolute description text-light'>Instagram</p>
          <img src="../../img/news/ins_2.png" className='w-100' alt="" />
        </div>
        <div className="item position-relative p-0 col-3">
          <a href="https://www.instagram.com/" className='position-absolute link fs-2 text-light'>
            <i className="bi bi-instagram"></i>
          </a>
          <p className='m-0 p-3 fs-3 fw-bold position-absolute description text-light'>Instagram</p>
          <img src="../../img/news/ins_3.png" className='w-100' alt="" />
        </div>
        <div className="item position-relative p-0 col-3">
          <a href="https://www.instagram.com/" className='position-absolute link fs-2 text-light'>
            <i className="bi bi-instagram"></i>
          </a>
          <p className='m-0 p-3 fs-3 fw-bold position-absolute description text-light'>Instagram</p>
          <img src="../../img/news/ins_4.png" className='w-100' alt="" />
        </div>
      </div>
    </div>
  )
}