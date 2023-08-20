import React from 'react'
import { NavLink } from "react-router-dom";


export default function FooterHome() {
  return (
    <div className='footer'>
      <div className="container">
        <div className="list-footer row">
          <div className="footer-1 wow col-lg-3 col-md-6">
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
          <div className="footer-2 wow col-lg-3 col-md-6">
            <p>Community</p>
            <ul>
              <li>
                <NavLink to="">
                TravelDnD: relief housing
                </NavLink>
              </li>
              <li>
                <NavLink to="">
                  Anti-discrimination
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer-3 wow col-lg-3 col-md-6">
            <p>Welcome guests</p>
            <ul>
              <li>
                <NavLink to="">
                  Rent a house on TravelDnD
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
          <div className="footer-4 wow col-lg-3 col-md-6">
            <p>TravelDnD</p>
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
          <p>© 2023 TravelDnD, Inc.</p>
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