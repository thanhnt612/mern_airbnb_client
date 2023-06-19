import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore';
import { getBookingDetailApi, postBookingApi } from '../../redux/reducers/bookingReducer';
import { DateRangePicker, RangeKeyDict } from "react-date-range"
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { history } from '../../index';

export default function Detail() {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { arrBookingId } = useSelector((state: RootState) => state.bookingReducer);
  const dispatch: DispatchType = useDispatch();

  const params: any = useParams();
  useEffect(() => {
    const action = getBookingDetailApi(params.id);
    dispatch(action);
  }, [params.id])
  const checkIn: any = arrBookingId?.checkIn;
  const checkOut: any = arrBookingId?.checkOut;
  const price: any = arrBookingId?.price;
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  //Set date range picker
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
  // open close
  const [open, setOpen] = useState(false)
  // get the target element to toggle 
  const refOne = useRef<HTMLInputElement>(null)
  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (event: any) => {
    if (event.key === "Escape") {
      setOpen(false)
    }
  }
  const handleChangeDate = (rangesByKey: RangeKeyDict) => {
    const changeDate: any = rangesByKey
    setRange([changeDate.selection]);
  }
  const dateDiff = (date1: any, date2: any) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
    );
  }
  const totalPrice = price *
    dateDiff
      (format(range[0].startDate, "yyyy-MM-dd"),
        format(range[0].endDate, "yyyy-MM-dd")) + 10;
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      dateIn: { value: any };
      dateOut: { value: any };
      guest: { value: number };
    };
    const dateIn = target.dateIn.value;
    const dateOut = target.dateOut.value;
    const guest = target.guest.value;
    if (Object.keys(userLogin).length === 0) {
      toast.error('Please login your account !!!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => history.push('/user/login')
      });
    } else {
      const action = postBookingApi(
        arrBookingId?._id, userLogin.id, name, phone, dateIn, dateOut, guest, totalPrice)
      dispatch(action);
    }
  }
  return (
    <div className='detail-page'>
      <div className="container">
        <h3 className='pt-3'>{arrBookingId?.title}</h3>
        <div className="title">
          <div className="info">
            <ul>
              <li>
                <p><i className='fa fa-star'></i>5,0
                  <span
                    className='underline'>(20 reviews)
                  </span></p>
              </li>
              <li>
                <i className="fa-solid fa-house-user"></i>
                <span>Super host</span>
              </li>
              <li className='underline'>
                {arrBookingId?.address}
              </li>
            </ul>
          </div>
          <div className="share">
            <ul>
              <li className='underline'>
                <i className='fa fa-share'></i>
                <span>Share</span>
              </li>
              <li>
                <i className='fa fa-heart'></i>
                <span>Save</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="image">
          {arrBookingId?.photos.map((pic: any, index: number) => {
            return <div className={`p-1 item-${index}`} key={index}>
              <img src={'http://localhost:8080/uploads/' + pic} className='w-100 h-100' alt="" />
            </div>
          })}
        </div>
        <div className="description">
          <div className="row">
            <div className="content col-md-7 col-lg-7 col-xl-8">
              <div className="row">
                <div className="title-left col-md-10 col-xl-11">
                  <h3>Entire apartment - Apartments for Rent</h3>
                  <p>
                    Guests - Bedroom - Bed - Bath
                  </p>
                </div>
                <div className="title-right col-md-2 col-xl-1">
                  <img src="http://picsum.photos/50/50" className='w-100 rounded-circle' alt="" />
                </div>
              </div>
              <div className="service col-12 border-top border-bottom py-3">
                <div className="row">
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className='fa fa-home'></i>
                    </div>
                    <div className="col-11">
                      <h4>The Whole House</h4>
                      <p>Luxury Apartments</p>
                    </div>
                  </div>
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className="fa-solid fa-hand-sparkles"></i>
                    </div>
                    <div className="col-11">
                      <h4>Enhanced Clean</h4>
                      <p>The five-step enhanced cleaning process for Airbnb <NavLink to=''>Show more</NavLink>
                      </p>
                    </div>
                  </div>
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className="fa-solid fa-house-user"></i>
                    </div>
                    <div className="col-11">
                      <h4>Super host</h4>
                      <p>
                        {arrBookingId?.description}
                      </p>
                    </div>
                  </div>
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className="fa-regular fa-calendar-days"></i>
                    </div>
                    <div className="col-11">
                      <h4>Free for 48 hours</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="authority py-3">
                <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt=""
                  width={125} height={26}
                />
                <p className='pt-3'>
                  AirCover is comprehensive protection for Airbnb guests, included for free with every booking. It includes protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in, as well as a 24-hour Safety Line.
                </p>
                <NavLink to=''>
                  Find out more
                </NavLink>
              </div>
              <div className="facility py-3 border-top w-100">
                <h4>What this place offers</h4>
                <div className="show-more d-flex flex-row flex-wrap pt-3">
                  {arrBookingId?.perks.map((perk: any, index: number) => {
                    return <div className='col-3 border p-3 bg-white rounded' key={index}>
                      {perk === 'wifi' ?
                        (<label>
                          <input type="checkbox" checked className='me-2' />
                          <i className="bi bi-wifi"></i> <span>Wifi</span>
                        </label>)
                        : ""}
                      {perk === 'tv' ?
                        (<label>
                          <input type="checkbox" checked className='me-2' />
                          <i className="bi bi-tv"></i> <span>TV</span>
                        </label>)
                        : ""}
                      {perk === 'pet' ?
                        (<label>
                          <input type="checkbox" checked className='me-2' />
                          <i className="bi bi-piggy-bank"></i> <span>Pets</span>
                        </label>)
                        : ""}
                      {perk === 'park' ?
                        (<label>
                          <input type="checkbox" checked className='me-2' />
                          <i className="bi bi-p-circle"></i> <span>Free parking spot</span>
                        </label>)
                        : ""}
                      {perk === 'entrance' ?
                        (<label>
                          <input type="checkbox" checked className='me-2' />
                          <i className="bi bi-signpost-split"></i> <span>Private entrance</span>
                        </label>)
                        : ""}
                    </div>
                  })}
                </div>
              </div>
              <div className="schedule">
                {checkIn >= 12 ?
                  <p><span className='fw-bold'>Check In:</span> {arrBookingId?.checkIn}:00 PM</p>
                  :
                  <p><span className='fw-bold'>Check In</span> {arrBookingId?.checkIn}:00 AM</p>
                }
                {checkOut >= 12 ?
                  <p><span className='fw-bold'>Check Out:</span> {arrBookingId?.checkOut}:00 PM</p>
                  :
                  <p><span className='fw-bold'>Check Out:</span>  {arrBookingId?.checkOut}:00 AM</p>
                }
                <p><span className='fw-bold'>Max guest:</span> {arrBookingId?.maxGuest} guest</p>
              </div>
            </div>
            <div className="payment col-md-5 col-lg-5 col-xl-4">
              <form
                onSubmit={handleSubmit}
              >
                <div className="check p-4 bg-light">
                  <div className="cost">
                    <p> <span className='fw-bold'>${arrBookingId?.price}</span>/night</p>
                  </div>
                  <div className="row">
                    <div className="calendar p-2 text-center ">
                      <div className="check row">
                        <div className="check-in col-lg-12 col-xl-6">
                          <p>
                            <i className="fa-regular fa-calendar-days"></i> Check In</p>
                          <input
                            id='dateIn'
                            name='dateIn'
                            value={format(range[0].startDate, "yyyy-MM-dd")}
                            readOnly
                            className="date-in text-center"
                            onClick={() => setOpen(open => !open)}
                          />
                        </div>
                        <div className="check-out col-lg-12 col-xl-6">
                          <p><i className="fa-regular fa-calendar-days"></i> Check Out</p>
                          <input
                            id='dateOut'
                            name='dateOut'
                            value={format(range[0].endDate, "yyyy-MM-dd")}
                            readOnly
                            className="date-out text-center"
                            onClick={() => setOpen(open => !open)}
                          />
                        </div>
                      </div>
                      <div ref={refOne}>
                        {open &&
                          <DateRangePicker
                            onChange={handleChangeDate}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            months={2}
                            direction="horizontal"
                            className="calendarElement"
                          />
                        }
                      </div>
                    </div>
                    <div className="add-guest w-100 mt-2 p-2">
                      <p>Guest: </p>
                      <input className='w-20'
                        type="number"
                        id='guest'
                        name='guest' />
                    </div>
                    <div className="add-guest w-100 mt-2 p-2">
                      <p>Name: </p>
                      <input className='w-20'
                        type="text"
                        id='name'
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="add-guest w-100 mt-2 p-2">
                      <p>Phone: </p>
                      <input className='w-20'
                        type="text"
                        id='phone'
                        name='phone'
                        value={phone}
                        onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className='button my-3'>
                      <button className='btn border' type='submit'>
                        <ToastContainer
                          position="top-center"
                          autoClose={3000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored" />
                        Reserve
                      </button>
                    </div>
                    <div className='notification text-center'>
                      <p>You won't be charged yet</p>
                    </div>
                    <div className="check-payment border-bottom">
                      <div className="cost-amount d-flex justify-content-between">
                        <div className="cost-date text-decoration-underline">
                          <p>
                            ${price} x {dateDiff
                              (format(range[0].startDate, "yyyy-MM-dd"),
                                format(range[0].endDate, "yyyy-MM-dd"))} night
                          </p>
                        </div>
                        <div className="bill">
                          <p>
                            ${price * dateDiff
                              (format(range[0].startDate, "yyyy-MM-dd"),
                                format(range[0].endDate, "yyyy-MM-dd"))}
                          </p>
                        </div>
                      </div>
                      <div className="service-cost d-flex justify-content-between">
                        <div className="service text-decoration-underline">
                          <p>Cleaning fee</p>
                        </div>
                        <div className="cost">
                          $10
                        </div>
                      </div>
                    </div>
                    <div className="total d-flex justify-content-between py-3">
                      <div className="detail">
                        <p>Total before taxes</p>
                      </div>
                      <div className="in-total">
                        ${price *
                          dateDiff
                            (format(range[0].startDate, "yyyy-MM-dd"),
                              format(range[0].endDate, "yyyy-MM-dd")) + 10}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}