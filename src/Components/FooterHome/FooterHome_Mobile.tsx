import React from 'react'
import { NavLink } from "react-router-dom";

export default function Footerhome() {
    return (
        <div className='footer-mobile'>
            <div className="container">
                <div className="list-footer wow row">
                    <div className="footer-1 col-6">
                        <p>Support</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Help
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    AirCover
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Support for people with disabilities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Cancellation options
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    COVID-19 pandemic response
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Report a concern - Neighborhood
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-2 col-6">
                        <p>Community</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Airbnb.org: relief housing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Anti-discrimination
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-3 col-6">
                        <p>Welcome guests</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Rent a house on Airbnb
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    AirCover for Hosts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Welcoming Guests
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Visit the community forum
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Welcoming Guests
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-4 col-6">
                        <p>Airbnb</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    News
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Features
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Founder's Letter
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Career opportunities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Investors
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='license border-top py-3 d-flex align-items-center'>
                    <p>© 2023 Airbnb, Inc.</p>
                </div>
                <div className="list-license">
                    <ul>
                        <li>
                            <NavLink to="">
                                Privacy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="">
                                Rules
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="">
                                Sitemap
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}