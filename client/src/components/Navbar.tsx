import '../App.css';

import { useLocation } from 'react-router-dom'

import Logo from './Logo'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const Navbar: React.FC = () => {

  let location: any = useLocation()?.pathname;

  return (
    <div>
      <div className="navbar">
        <div>
          <Logo/>
        </div>
        <div className="navbar_right">
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
            <Button variant="outlined" color="primary">Slack</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
