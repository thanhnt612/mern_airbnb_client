export const About = () => {
    return (
            <div className="about-page">
                <div className="banner">
                    <img src="../../img/banner/about.jpg"
                        className='w-100 object-fit-cover' alt="" />
                </div>
                <div className="content container">
                    <div className='tittle text-center'>
                        <p className='py-3 mb-0'>⌛⌛⌛</p>
                        <h2>
                        🌟 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝑻𝒓𝒂𝒗𝒆𝒍𝑫𝒏𝑫 🌟
                        </h2>
                    </div>
                    <p className='text-center py-3'>
                        We are a one-stop shop for all your hotel booking needs. We offer a wide selection of hotels to choose from, all at competitive prices. Our website is easy to use and our booking process is quick and secure.
                    </p>
                    <p className='fw-bold text-center'>
                    ✨Why Book with Us?✨
                    </p>
                    <ul>
                        <li>
                            Wide selection of hotels: We offer a wide selection of hotels to choose from, all at competitive prices. Whether you're looking for a budget-friendly hotel or a luxury resort, we have the perfect hotel for you.
                        </li>
                        <li>
                            Easy to use website: Our website is easy to use and our booking process is quick and secure. You can book your hotel room in just a few clicks.
                        </li>
                        <li>
                            Lowest price guarantee: We offer a lowest price guarantee on all of our hotels. If you find a lower price elsewhere, we will match it.
                        </li>
                        <li>
                            24/7 customer support: Our customer support team is available 24/7 to help you with any questions or problems you may have.
                        </li>
                    </ul>
                    <div className="service d-flex flex-wrap align-items-center py-4">
                        <div className="item col-6 col-lg-3 p-3">
                            <div className="detail bg-danger text-light border-3 rounded-4 
                            text-center d-flex align-items-center flex-column p-3"
                                style={{ cursor: "pointer" }}>
                                <i className="fs-1 bi bi-gear"></i>
                                <p>Features</p>
                            </div>
                        </div>
                        <div className="item col-6 col-lg-3 p-3">
                            <div className="detail bg-danger text-light border-3 rounded-4 
                            text-center d-flex align-items-center flex-column p-3"
                                style={{ cursor: "pointer" }}>
                                <i className="fs-1 bi bi-hand-thumbs-up"></i>
                                <p>Easily</p>
                            </div>
                        </div>
                        <div className="item col-6 col-lg-3 p-3">
                            <div className="detail bg-danger text-light border-3 rounded-4 
                            text-center d-flex align-items-center flex-column p-3"
                                style={{ cursor: "pointer" }}>
                                <i className="fs-1 bi bi-cash"></i>
                                <p>Affordable</p>
                            </div>
                        </div>
                        <div className="item col-6 col-lg-3 p-3">
                            <div className="detail bg-danger text-light border-3 rounded-4 
                            text-center d-flex align-items-center flex-column p-3"
                                style={{ cursor: "pointer" }}>
                                <i className="fs-1 bi bi-person-fill-gear"></i>
                                <p>Support</p>
                            </div>
                        </div>
                    </div>
                    <p className='fw-bold text-center'>
                    ✨How to Book a Hotel Room✨
                    </p>
                    <ul>
                        <li>
                            To book a hotel room on our website, simply enter your destination. We will then show you a list of hotels that are available on your dates. You can then filter the results by price, star rating and more.
                        </li>
                        <br />
                        <li>
                            Once you have found a hotel that you like, simply click on the "Book Now" button. You will then be prompted to enter your personal information and payment information. Once you have completed the booking process, you will receive a confirmation email with all of the details of your reservation.
                        </li>
                    </ul>
                    <p className='fw-bold text-center py-4'>
                        We hope to see you soon at <span className='text-danger'>𝑻𝒓𝒂𝒗𝒆𝒍𝑫𝒏𝑫</span> 👋👋
                    </p>
                </div>
                <div className="introduce d-flex flex-wrap align-items-center justify-content-center container pb-5">
                    <div className="col-12 col-md-6 col-lg-4 p-2">
                        <div className='thumbnail position-relative'>
                            <img className='w-100 rounded-3'
                                style={{ height: "250px" }}
                                src="../../img/travel/step1.jpg" alt="" />
                            <div className="detail px-3 position-absolute bottom-0 text-light">
                                <h3 className='text-uppercase fw-bold'>Quang Ninh</h3>
                                <p className='fs-5 m-0'>Ha Long Bay</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 p-2">
                        <div className='thumbnail position-relative'>
                            <img className='w-100 rounded-3'
                                style={{ height: "250px" }}
                                src="../../img/travel/step2.jpg" alt="" />
                            <div className="detail px-3 position-absolute bottom-0 text-light">
                                <h3 className='text-uppercase fw-bold'>Ho Chi Minh</h3>
                                <p className='fs-5 m-0'>Notre Dame Cathedral</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 p-2">
                        <div className='thumbnail position-relative'>
                            <img className='w-100 rounded-3'
                                style={{ height: "250px" }}
                                src="../../img/travel/step3.jpg" alt="" />
                            <div className="detail px-3 position-absolute bottom-0 text-light">
                                <h3 className='text-uppercase fw-bold'>Ha Noi</h3>
                                <p className='fs-5 m-0'>Sword Lake</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 p-2">
                        <div className='thumbnail position-relative'>
                            <img className='w-100 rounded-3'
                                style={{ height: "250px" }}
                                src="../../img/travel/step4.png" alt="" />
                            <div className="detail px-3 position-absolute bottom-0 text-light">
                                <h3 className='text-uppercase fw-bold'>Quang Nam</h3>
                                <p className='fs-5 m-0'>Hoi An Ancient Town</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 p-2">
                        <div className='thumbnail position-relative'>
                            <img className='w-100 rounded-3'
                                style={{ height: "250px" }}
                                src="../../img/travel/step5.jpg" alt="" />
                            <div className="detail px-3 position-absolute bottom-0 text-light">
                                <h3 className='text-uppercase fw-bold'>Tien Giang</h3>
                                <p className='fs-5 m-0'>Thoi Son Island</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 p-2">
                        <div className='thumbnail position-relative'>
                            <img className='w-100 rounded-3'
                                style={{ height: "250px" }}
                                src="../../img/travel/step6.jpg" alt="" />
                            <div className="detail px-3 position-absolute bottom-0 text-light">
                                <h3 className='text-uppercase fw-bold'>Ha Giang</h3>
                                <p className='fs-5 m-0'>Hoang Su Phi Terraced Fields</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
