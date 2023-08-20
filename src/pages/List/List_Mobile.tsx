import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { getBookingLocationApi } from '../../redux/reducers/bookingReducer';

export default function List() {
  const dispatch: DispatchType = useDispatch();
  const { arrLocation } = useSelector((state: RootState) => state.bookingReducer)
  const params: any = useParams();
  const path = `https://placebooking.vercel.app/${params.dest}`;
  const url = new URL(path);
  const newPart = url.pathname.split('/')[1];
  useEffect(() => {
    if (newPart) {
      dispatch(getBookingLocationApi(newPart));
    }
  }, [newPart]);
  return (
    <div className='list-page-mobile'>
      <div className="container">
        <div className="row">
          <div className="content col-12">
            <div className="tittle pt-3 text-center" >
              <p>
                Have <span className='fw-bold text-danger'>{arrLocation?.length}</span> selected accommodation
              </p>
              <h5 className='text-center'>
                Selected accommodation in <br /> {arrLocation?.[0].address}
              </h5>
            </div>
            {arrLocation?.map((location: any, index: number) => {
              return <div className={`list-choose item-${index} d-flex flex-wrap bg-light border border-2 
                            border-success border-opacity-25 rounded wow`} key={index}>
                <div className="thumbnail d-flex align-items-center p-2 col-12 col-md-5">
                  <img src={location.photos[0]}
                    className='w-100 rounded' alt="" />
                </div>
                <div className="detail d-flex flex-column justify-content-center p-3 col-12 col-md-7">
                  <div className="info">
                    <h5 className='m-0 text-truncate'>🏩{location.title}</h5>
                    <div className="d-flex flex-row flex-nowrap text-truncate py-2">
                      <span className='fw-bold me-2'>⚙️Service:</span>
                      {location?.perks.map((perk: any, index: number) => {
                        return (<div className='col-2 col-md-2 d-flex flex-row' key={index}>
                          {perk === 'wifi' ?
                            (<>
                              <i className="me-1 bi bi-wifi"></i> <span>Wifi</span>
                            </>)
                            : ""}
                          {perk === 'tv' ?
                            (<>
                              <i className="me-1 bi bi-tv"></i> <span>TV</span>
                            </>)
                            : ""}
                          {perk === 'pet' ?
                            (<>
                              <i className="me-1 bi bi-piggy-bank"></i> <span>Pets</span>
                            </>)
                            : ""}
                          {perk === 'park' ?
                            (<>
                              <i className="me-1 bi bi-p-circle"></i> <span>Park</span>
                            </>)
                            : ""}
                          {perk === 'entrance' ?
                            (<>
                              <i className="me-1 bi bi-signpost-split"></i> <span>Entry</span>
                            </>)
                            : ""}
                        </div>)
                      })}
                    </div>
                    <p className='mb-2'>#️⃣Max guest: <span className='fw-bold'>{location.maxGuest}</span></p>
                    <p className='m-0'><span className='fw-bold'>💲{location.price}</span> / night </p>
                  </div>
                  <div className="view-more">
                    <div className="button">
                      <NavLink to={`/detail/${location._id}`} className="btn">
                        <span>
                          View
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
          {arrLocation?.[0].address.includes("Ho Chi Minh") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.76528307789!2d106.67776296566835!3d10.775218529009996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686653833952!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Ha Noi") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.097617496563!2d105.84978977605466!3d21.02877973777628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab953357c995%3A0x1babf6bb4f9a20e!2zSOG7kyBIb8OgbiBLaeG6v20!5e0!3m2!1svi!2s!4v1686654238127!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Can Tho") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.813098492677!2d105.78565587592286!3d10.032276772476637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a06298aae43e71%3A0xc6a64bdac582285d!2zQuG6v24gTmluaCBLaeG7gXU!5e0!3m2!1svi!2s!4v1686654302661!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Khanh Hoa") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124762.63352012495!2d109.16410102699437!3d12.25962560894862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zTmhhIFRyYW5nLCBLaMOhbmggSMOyYSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686654385992!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Kien Giang") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251289.71520850237!2d103.7926148582871!3d10.229141871057696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62b49eda17%3A0x8aa79fbbdd72cdb!2zUGjDuiBRdeG7kWM!5e0!3m2!1svi!2s!4v1686654422429!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Da Nang") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61349.621601078994!2d108.16550645520255!3d16.047247302846216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2zxJDDoCBO4bq1bmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686654465426!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Lam Dong") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124928.46940444077!2d108.36832172370981!3d11.904066867420886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2zVHAuIMSQw6AgTOG6oXQsIEzDom0gxJDhu5NuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686654500621!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
          {arrLocation?.[0].address.includes("Binh Thuan") ? (
            <div className="wow map col-12 d-flex d-flex">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125371.82551523516!2d108.09155736517349!3d10.897517473109167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176830f876e16e5%3A0x2a82c373d3a16cc8!2zVHAuIFBoYW4gVGhp4bq_dCwgQsOsbmggVGh14bqtbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1686654525467!5m2!1svi!2s"
                width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
            </div>
          ) : ""}
        </div>
      </div>
    </div >
  )
}
