import '../App.css';
import React, { useState } from 'react';

import Logo from './Logo'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import HamburgerMenu from "react-hamburger-menu"
import { useLocation } from 'react-router-dom'


const HamburgerNavbar: React.FC = () => {

  let location: any = useLocation()?.pathname;
  let [state, setState] = useState(false)

  function handleHamburger() {
    setState(!state);
  }

  return (
    <div className="navbar">
      <div>
          <Logo/>
      </div>
      <div className="navbar_right">
        <HamburgerMenu isOpen={state} menuClicked={handleHamburger} color="black" strokeWidth={3} />
      </div>
      {state && (
        <div className="hamNavbar">
          <Link className="navbar_link" color='textPrimary' href="/">
            <p className={location === "/" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Home
            </p>
          </Link>
          <Link className="navbar_link" color='textPrimary' href="/schedule">
            <p className={location === "/schedule" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Schedule
            </p>
          </Link>
          <Link className="navbar_link" color='textPrimary' href="/tracks">
            <p className={location === "/tracks" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Tracks
            </p>
          </Link>
          <Link className="navbar_link" color='textPrimary' href="/mentors">
            <p className={location === "/mentors" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Mentors
            </p>
          </Link>
          <Link className="navbar_link" color='textPrimary' href="/sponsors">
              <p className={location === "/sponsors" ? "navbar_link_text_bold" : "navbar_link_text"}>
                Sponsors
              </p>
            </Link>
          <Link className="navbar_link" color='textPrimary' href="/prizes">
            <p className={location === "/prizes" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Prizes
            </p>
          </Link>
          <Link className="navbar_link" color='textPrimary' href="/info">
            <p className={location === "/info" ? "navbar_link_text_bold" : "navbar_link_text"}>
              Info
            </p>
          </Link>
          <div className="navbar_button">
          <Button variant="outlined" color="primary"    href="https://join.hack.gt" target="_blank"  >Discord</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default HamburgerNavbar;
