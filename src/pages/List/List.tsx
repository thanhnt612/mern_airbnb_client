import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import { getBookingLocationApi } from "../../redux/reducers/bookingReducer";

export default function List() {
  const dispatch: DispatchType = useDispatch();
  const { arrLocation } = useSelector(
    (state: RootState) => state.bookingReducer
  );
  const params: any = useParams();
  const path = `https://placebooking.vercel.app/${params.dest}`;
  const url = new URL(path);
  const newPart = url.pathname.split("/")[1];
  useEffect(() => {
    if (newPart) {
      dispatch(getBookingLocationApi(newPart));
    }
  }, [newPart]);
  return (
    <div className="list-page py-5">
      <div className="container">
        <div className="row">
          <div className="content col-md-12 col-lg-6 mb-3">
            <div className="tittle text-center pt-3">
              <p>
                Have{" "}
                <span className="fw-bold text-danger">
                  {arrLocation?.length}
                </span>{" "}
                selected accommodation &nbsp;
                <i className="text-danger bi bi-house-down-fill"></i>
              </p>
              <h5>
                Selected accommodation in &nbsp; <br/>
                <span className="text-danger">{arrLocation?.[0].address}</span>
              </h5>
            </div>
            <div className="d-flex flex-wrap">
              {arrLocation?.map((location: any, index: number) => {
                return (
                  <div
                    className={`col-12 p-2 list-choose item-${index} wow`}
                    key={index}
                  >
                    <div className="bg-light border border-2 d-flex flex-wrap
                  border-success border-opacity-25 rounded">
                      <div className="thumbnail col-12 col-md-4 p-2">
                        <img
                          src={location.photos[0]}
                          className="w-100 h-100 rounded"
                          alt=""
                        />
                      </div>
                      <div className="detail col-12 col-md-8 p-2">
                        <div className="info">
                          <p className='text-truncate fw-bold mb-1'>
                            {location.available
                              ?
                              <span className='text-success'>Availability</span>
                              :
                              <span className='text-danger'>Fully - Booked</span>
                            }
                          </p>
                          <p className="fw-bold m-0 text-truncate">
                            🏩{location.title}
                          </p>
                          <div className="d-flex flex-row flex-wrap py-2">
                            {location?.perks.map((perk: any, index: number) => {
                              return (
                                <>
                                  <div className="col-2 d-flex flex-row" key={index}>
                                    {perk === "wifi" ? (
                                      <>
                                        <i className="bi bi-wifi"></i>{" "}
                                        <span>Wifi</span>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {perk === "tv" ? (
                                      <>
                                        <i className="bi bi-tv"></i>{" "}
                                        <span>TV</span>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {perk === "pet" ? (
                                      <>
                                        <i className="bi bi-piggy-bank"></i>{" "}
                                        <span>Pets</span>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {perk === "park" ? (
                                      <>
                                        <i className="bi bi-p-circle"></i>{" "}
                                        <span>Park</span>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {perk === "entrance" ? (
                                      <>
                                        <i className="bi bi-signpost-split"></i>{" "}
                                        <span>Entry</span>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div className="pb-2">
                            <span className="my-1 fw-bold">#️⃣Max guest: </span>
                            <span>{location.maxGuest}</span>
                          </div>
                          <p className="my-1">
                            <span className="fw-bold">💲{location.price}</span> /
                            night{" "}
                          </p>
                        </div>
                        <div className="view-more">
                          <div className="button">
                            {location.available
                              ?
                              <button className="btn btn-success">
                                <NavLink to={`/detail/${location._id}`} >
                                  Book Now
                                </NavLink>
                              </button>
                              :
                              <button className="btn btn-danger" disabled={true}>
                                <NavLink to={`/detail/${location._id}`}  >
                                  Fully - Booked
                                </NavLink>
                              </button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="wow map col-md-12 col-lg-6 d-flex">
            <iframe width="900"
              style={{ minHeight: "88vh", border: 0 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${newPart}}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
